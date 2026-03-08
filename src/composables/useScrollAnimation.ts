import { onUnmounted } from 'vue'

/**
 * Composable for scroll-triggered animations using IntersectionObserver.
 *
 * - Uses IntersectionObserver API (not scroll events + getBoundingClientRect)
 * - Adds 'animated' class when element enters viewport, then unobserves it
 * - Disconnects observer on component unmount
 * - Respects prefers-reduced-motion: if enabled, immediately marks elements
 *   as animated without waiting for intersection (skips animation effect)
 *
 * Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5
 */
export function useScrollAnimation(threshold = 0.15) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const observer = prefersReducedMotion
    ? null
    : new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated')
              observer!.unobserve(entry.target)
            }
          })
        },
        { threshold }
      )

  /**
   * Start observing an element for scroll-triggered animation.
   * If prefers-reduced-motion is enabled, immediately adds 'animated' class.
   */
  const observe = (el: HTMLElement): void => {
    if (prefersReducedMotion) {
      el.classList.add('animated')
    } else {
      observer!.observe(el)
    }
  }

  const disconnect = (): void => {
    observer?.disconnect()
  }

  onUnmounted(disconnect)

  return { observe }
}
