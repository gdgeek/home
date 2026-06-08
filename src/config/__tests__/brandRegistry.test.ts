import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { getBrandConfig, isValidBrandId, getAllBrandIds } from '../brandRegistry'

/**
 * Validates: Requirements 15.1, 16.2
 */

const VALID_BRAND_IDS = ['xingkou', 'xiading', 'xrugc', 'mrpp'] as const

describe('brandRegistry', () => {
  describe('getBrandConfig', () => {
    it('returns null for invalid brand ID', () => {
      expect(getBrandConfig('invalid')).toBeNull()
      expect(getBrandConfig('')).toBeNull()
      expect(getBrandConfig('XINGKOU')).toBeNull()
    })

    it('returns config for all valid brand IDs', () => {
      for (const id of VALID_BRAND_IDS) {
        const config = getBrandConfig(id)
        expect(config).not.toBeNull()
        expect(config!.id).toBe(id)
      }
    })

    // Property test: for any valid brand ID, config is non-null and primaryColor starts with #
    it('property: valid brand ID always returns config with valid primaryColor', () => {
      fc.assert(
        fc.property(fc.constantFrom(...VALID_BRAND_IDS), (brandId) => {
          const config = getBrandConfig(brandId)
          expect(config).not.toBeNull()
          expect(config!.theme.primaryColor).toMatch(/^#[0-9A-Fa-f]{3,8}$/)
        })
      )
    })
  })

  describe('isValidBrandId', () => {
    it('returns true for valid brand IDs', () => {
      for (const id of VALID_BRAND_IDS) {
        expect(isValidBrandId(id)).toBe(true)
      }
    })

    it('returns false for invalid brand IDs', () => {
      expect(isValidBrandId('unknown')).toBe(false)
      expect(isValidBrandId('')).toBe(false)
    })

    // Property test: arbitrary strings that are not valid IDs return false
    it('property: arbitrary non-brand strings return false', () => {
      fc.assert(
        fc.property(
          fc.string().filter((s) => !(VALID_BRAND_IDS as readonly string[]).includes(s)),
          (s) => {
            expect(isValidBrandId(s)).toBe(false)
          }
        )
      )
    })
  })

  describe('getAllBrandIds', () => {
    it('returns all registered brand IDs', () => {
      const ids = getAllBrandIds()
      expect(ids).toHaveLength(VALID_BRAND_IDS.length)
      for (const id of VALID_BRAND_IDS) {
        expect(ids).toContain(id)
      }
    })
  })

  describe('brand config completeness', () => {
    it.each(VALID_BRAND_IDS)('%s config has all required fields', (brandId) => {
      const config = getBrandConfig(brandId)!
      // Core fields
      expect(config.id).toBe(brandId)
      expect(config.name).toBeTruthy()
      expect(config.locale).toBeTruthy()
      expect(config.loginUrl).toBeTruthy()
      // Theme
      expect(config.theme.primaryColor).toMatch(/^#/)
      expect(config.theme.logoAlt).toBeTruthy()
      expect(config.theme.faviconPath).toBeTruthy()
      // Hero
      expect(config.hero.title).toBeTruthy()
      expect(config.hero.highlights).toBeInstanceOf(Array)
      expect(config.hero.highlights.length).toBeGreaterThan(0)
      // Footer
      expect(config.footer.copyright).toBeTruthy()
      expect(config.footer.navigation).toBeInstanceOf(Array)
    })
  })
})
