import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { getBrandConfig } from '@/config/brandRegistry'
import XiadingHomePage from '../XiadingHomePage.vue'

const selectedBrand = vi.hoisted(() => ({ id: 'xiading' as 'xiading' | 'xiading-rokid' }))

vi.mock('@/composables/useBrand', () => ({
  useBrand: () => {
    const config = getBrandConfig(selectedBrand.id)!
    return {
      brandId: computed(() => selectedBrand.id),
      brandName: computed(() => config.name),
      hero: computed(() => config.hero),
      footer: computed(() => config.footer),
    }
  },
}))
vi.mock('@/utils/externalAssets', () => ({ loadExternalStylesheet: vi.fn() }))
vi.mock('@/components/common/LoginModal.vue', () => ({
  default: {
    props: ['modelValue'],
    template: '<div v-if="modelValue" data-test="login-open"></div>',
  },
}))

let wrapper: VueWrapper | undefined
beforeEach(() => {
  vi.stubGlobal('__BUILD_TIME__', '2026-10-27T00:00:00+08:00')
})
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  vi.unstubAllGlobals()
})

describe('Xiading homepage brand separation', () => {
  it.each(['xiading', 'xiading-rokid'] as const)('%s displays its own header, partnership and footer', (brandId) => {
    selectedBrand.id = brandId
    wrapper = mount(XiadingHomePage)
    const coBranded = brandId === 'xiading-rokid'

    expect(wrapper.find('.xd-nav .xd-brand').exists()).toBe(coBranded)
    expect(wrapper.find('#partnership').exists()).toBe(coBranded)
    expect(wrapper.find('footer a[href="https://www.rokid.com/"]').exists()).toBe(coBranded)
    expect(wrapper.get('.xd-cta h2').text().includes('Rokid')).toBe(coBranded)
    expect(wrapper.get('.xd-hero__desc').text()).toContain(coBranded ? '夏鼎攜手 Rokid' : '澳門本土研發')
  })

  it.each(['xiading', 'xiading-rokid'] as const)('%s mobile creation action closes its menu and opens login', async (brandId) => {
    selectedBrand.id = brandId
    wrapper = mount(XiadingHomePage, { attachTo: document.body })
    await wrapper.get('.xd-nav__hamburger').trigger('click')
    expect(wrapper.get('.xd-nav__hamburger').attributes('aria-expanded')).toBe('true')
    await wrapper.get('.xd-nav__mobile button').trigger('click')

    expect(wrapper.get('.xd-nav__hamburger').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('[data-test="login-open"]').exists()).toBe(true)
  })
})
