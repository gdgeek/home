/**
 * Validates: Requirements 13.2, 13.3, 13.4, 13.5
 *
 * Tests for useScrollAnimation composable:
 * - Property test: any intersecting element gets 'animated' class and is unobserved
 * - Unit test: disconnect is called on component unmount
 * - Unit test: prefers-reduced-motion skips IntersectionObserver, immediately adds 'animated'
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import * as fc from 'fast-check'

// ---- IntersectionObserver mock ----
let mockObserve: ReturnType<typeof vi.fn>
let mockUnobserve: ReturnType<typeof vi.fn>
let mockDisconnect: ReturnType<typeof vi.fn>
let intersectionCallback: (entries: IntersectionObserverEntry[]) => void

function setupIntersectionObserverMock() {
  mockObserve = vi.fn()
  mockUnobserve = vi.fn()
  mockDisconnect = vi.fn()

  // Must use a real constructor function (not arrow fn) so `new` works
  const MockIntersectionObserver = function (
    this: unknown,
    callback: (entries: IntersectionObserverEntry[]) => void,
  ) {
    intersectionCallback = callback
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
}

function setupMatchMediaMock(prefersReducedMotion: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: prefersReducedMotion }))
}

/**
 * Synchronous withSetup: mounts a minimal component to provide Vue lifecycle context.
 */
function withSetup<T>(composable: () => T): [T, ReturnType<typeof mount>] {
  let result!: T
  const TestComponent = defineComponent({
    setup() {
      result = composable()
      return {}
    },
    template: '<div></div>',
  })
  const wrapper = mount(TestComponent)
  return [result, wrapper]
}

function makeElement(): HTMLElement {
  return document.createElement('div')
}

describe('useScrollAnimation', () => {
  // ============================================
  // Normal mode (prefers-reduced-motion = false)
  // ============================================

  describe('with IntersectionObserver (no reduced motion)', () => {
    let useScrollAnimation: typeof import('../useScrollAnimation').useScrollAnimation

    beforeEach(async () => {
      setupIntersectionObserverMock()
      setupMatchMediaMock(false)
      vi.resetModules()
      const mod = await import('../useScrollAnimation')
      useScrollAnimation = mod.useScrollAnimation
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    /**
     * Validates: Requirements 13.2
     */
    it('adds "animated" class when element intersects', () => {
      const [result, wrapper] = withSetup(() => useScrollAnimation())
      const el = makeElement()
      result.observe(el)
      intersectionCallback([{ isIntersecting: true, target: el } as IntersectionObserverEntry])
      expect(el.classList.contains('animated')).toBe(true)
      wrapper.unmount()
    })

    /**
     * Validates: Requirements 13.3
     */
    it('calls unobserve after element intersects', () => {
      const [result, wrapper] = withSetup(() => useScrollAnimation())
      const el = makeElement()
      result.observe(el)
      intersectionCallback([{ isIntersecting: true, target: el } as IntersectionObserverEntry])
      expect(mockUnobserve).toHaveBeenCalledWith(el)
      wrapper.unmount()
    })

    it('does NOT add "animated" class when element does not intersect', () => {
      const [result, wrapper] = withSetup(() => useScrollAnimation())
      const el = makeElement()
      result.observe(el)
      intersectionCallback([{ isIntersecting: false, target: el } as IntersectionObserverEntry])
      expect(el.classList.contains('animated')).toBe(false)
      wrapper.unmount()
    })

    it('calls IntersectionObserver.observe on the element', () => {
      const [result, wrapper] = withSetup(() => useScrollAnimation())
      const el = makeElement()
      result.observe(el)
      expect(mockObserve).toHaveBeenCalledWith(el)
      wrapper.unmount()
    })

    /**
     * Validates: Requirements 13.4
     */
    it('calls disconnect when component unmounts', () => {
      const [, wrapper] = withSetup(() => useScrollAnimation())
      wrapper.unmount()
      expect(mockDisconnect).toHaveBeenCalledTimes(1)
    })
  })

  // ============================================
  // prefers-reduced-motion (Requirement 13.5)
  // ============================================

  describe('prefers-reduced-motion', () => {
    let useScrollAnimation: typeof import('../useScrollAnimation').useScrollAnimation

    beforeEach(async () => {
      setupIntersectionObserverMock()
      setupMatchMediaMock(true)
      vi.resetModules()
      const mod = await import('../useScrollAnimation')
      useScrollAnimation = mod.useScrollAnimation
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    /**
     * Validates: Requirements 13.5
     */
    it('immediately adds "animated" class without using IntersectionObserver', () => {
      const [result, wrapper] = withSetup(() => useScrollAnimation())
      const el = makeElement()
      result.observe(el)
      expect(el.classList.contains('animated')).toBe(true)
      expect(mockObserve).not.toHaveBeenCalled()
      wrapper.unmount()
    })

    it('does not instantiate IntersectionObserver when prefers-reduced-motion is enabled', () => {
      // Track constructor calls via a spy on the global
      const constructorSpy = vi.fn(function (
        this: unknown,
        _callback: (entries: IntersectionObserverEntry[]) => void,
      ) {
        return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() }
      })
      vi.stubGlobal('IntersectionObserver', constructorSpy)

      const [, wrapper] = withSetup(() => useScrollAnimation())
      expect(constructorSpy).not.toHaveBeenCalled()
      wrapper.unmount()
    })
  })

  // ============================================
  // Property tests (Requirements 13.2, 13.3)
  // ============================================

  describe('property tests', () => {
    let useScrollAnimation: typeof import('../useScrollAnimation').useScrollAnimation

    beforeEach(async () => {
      setupIntersectionObserverMock()
      setupMatchMediaMock(false)
      vi.resetModules()
      const mod = await import('../useScrollAnimation')
      useScrollAnimation = mod.useScrollAnimation
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    /**
     * Property: any element observed and intersected gets 'animated' class and unobserve called.
     * Validates: Requirements 13.2, 13.3
     */
    it('property: any intersecting element gets animated class and is unobserved', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 10 }), (numElements) => {
          // Reset call counts between runs
          mockObserve.mockClear()
          mockUnobserve.mockClear()
          mockDisconnect.mockClear()

          const [result, wrapper] = withSetup(() => useScrollAnimation())
          const elements = Array.from({ length: numElements }, () => makeElement())
          elements.forEach((el) => result.observe(el))

          // Simulate all elements intersecting
          intersectionCallback(
            elements.map((el) => ({ isIntersecting: true, target: el } as IntersectionObserverEntry)),
          )

          for (const el of elements) {
            expect(el.classList.contains('animated')).toBe(true)
          }
          expect(mockUnobserve).toHaveBeenCalledTimes(numElements)

          wrapper.unmount()
        }),
        { numRuns: 20 },
      )
    })
  })
})
