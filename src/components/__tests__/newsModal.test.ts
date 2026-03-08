/**
 * DOMPurify sanitization property tests for NewsModal
 *
 * Validates: Requirements 19.2
 *
 * Tests that DOMPurify.sanitize() removes all executable scripts and event
 * handler attributes from arbitrary HTML strings before v-html rendering.
 */

import { describe, it, expect } from 'vitest'
import DOMPurify from 'dompurify'
import * as fc from 'fast-check'

// ---- Helpers ----

/** Returns true if the sanitized string contains any executable script remnants */
function containsExecutableScript(html: string): boolean {
  return (
    /<script/i.test(html) ||
    /javascript:/i.test(html) ||
    /\bon\w+\s*=/i.test(html) // onclick=, onerror=, onload=, etc.
  )
}

// ---- Arbitraries ----

/** Generates HTML strings that embed <script> tags */
const scriptTagArbitrary = fc
  .tuple(fc.string(), fc.string())
  .map(([before, after]) => `${before}<script>alert('xss')</script>${after}`)

/** Generates HTML strings with event handler attributes */
const eventHandlerArbitrary = fc
  .tuple(
    fc.constantFrom('onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur'),
    fc.string(),
    fc.string()
  )
  .map(([event, tag, payload]) => `<img ${event}="${payload}" src="${tag}">`)

/** Generates HTML strings with javascript: URIs */
const javascriptUriArbitrary = fc
  .string()
  .map((payload) => `<a href="javascript:${payload}">click</a>`)

// ---- Property Tests ----

describe('DOMPurify sanitization', () => {
  /**
   * Property: any HTML containing <script> tags is sanitized to remove them
   * Validates: Requirements 19.2
   */
  it('property: <script> tags are always removed after sanitization', () => {
    fc.assert(
      fc.property(scriptTagArbitrary, (html) => {
        const result = DOMPurify.sanitize(html)
        expect(result).not.toMatch(/<script/i)
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: any HTML containing event handler attributes is sanitized
   * Validates: Requirements 19.2
   */
  it('property: event handler attributes (onclick, onerror, onload, etc.) are always removed', () => {
    fc.assert(
      fc.property(eventHandlerArbitrary, (html) => {
        const result = DOMPurify.sanitize(html)
        expect(result).not.toMatch(/\bon\w+\s*=/i)
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: any HTML containing javascript: URIs is sanitized
   * Validates: Requirements 19.2
   */
  it('property: javascript: URIs are always removed after sanitization', () => {
    fc.assert(
      fc.property(javascriptUriArbitrary, (html) => {
        const result = DOMPurify.sanitize(html)
        expect(result).not.toMatch(/javascript:/i)
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: arbitrary strings never produce executable scripts after sanitization
   * Validates: Requirements 19.2
   */
  it('property: arbitrary strings never contain executable scripts after sanitization', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = DOMPurify.sanitize(input)
        expect(containsExecutableScript(result)).toBe(false)
      }),
      { numRuns: 200 }
    )
  })

  // ---- Unit Tests: Known XSS Vectors ----

  describe('known XSS vectors', () => {
    it('removes basic <script> tag', () => {
      const result = DOMPurify.sanitize('<script>alert("xss")</script>')
      expect(result).not.toMatch(/<script/i)
    })

    it('removes <script> with src attribute', () => {
      const result = DOMPurify.sanitize('<script src="https://evil.com/xss.js"></script>')
      expect(result).not.toMatch(/<script/i)
    })

    it('removes onclick attribute', () => {
      const result = DOMPurify.sanitize('<button onclick="alert(1)">click</button>')
      expect(result).not.toMatch(/onclick/i)
    })

    it('removes onerror attribute', () => {
      const result = DOMPurify.sanitize('<img src="x" onerror="alert(1)">')
      expect(result).not.toMatch(/onerror/i)
    })

    it('removes onload attribute', () => {
      const result = DOMPurify.sanitize('<body onload="alert(1)">')
      expect(result).not.toMatch(/onload/i)
    })

    it('removes javascript: href', () => {
      const result = DOMPurify.sanitize('<a href="javascript:alert(1)">click</a>')
      expect(result).not.toMatch(/javascript:/i)
    })

    it('removes mixed-case script tag', () => {
      const result = DOMPurify.sanitize('<ScRiPt>alert("xss")</ScRiPt>')
      expect(result).not.toMatch(/<script/i)
    })

    it('preserves safe HTML content', () => {
      const safe = '<p>Hello <strong>world</strong></p>'
      const result = DOMPurify.sanitize(safe)
      expect(result).toContain('<p>')
      expect(result).toContain('<strong>')
    })

    it('returns empty string for empty input', () => {
      expect(DOMPurify.sanitize('')).toBe('')
    })
  })
})
