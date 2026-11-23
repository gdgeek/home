import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
vi.mock('@/utils/externalAssets', () => ({ loadExternalStylesheet: vi.fn() }))
vi.mock('@/components/common/LoginModal.vue', () => ({
  default: {
    props: ['modelValue'],
    template: '<div v-if="modelValue" data-test="login-open"></div>',
  },
}))

let wrapper: VueWrapper | undefined
beforeEach(() => {
  vi.resetModules()
  vi.stubGlobal('__BUILD_TIME__', '2026-10-27T00:00:00+08:00')
})
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  vi.unstubAllGlobals()
})

describe('Xiading homepage', () => {
  it.each(['xiading', 'xiading-rokid'])('deployment value %s displays the joint brand homepage', async (brandId) => {
    vi.stubGlobal('__BRAND_ID__', brandId)
    const { default: XiadingHomePage } = await import('../XiadingHomePage.vue')
    wrapper = mount(XiadingHomePage)

    expect(wrapper.find('.xd-nav .xd-brand').exists()).toBe(true)
    expect(wrapper.find('#partnership').exists()).toBe(true)
    expect(wrapper.find('footer a[href="https://www.rokid.com/"]').exists()).toBe(true)
    expect(wrapper.get('.xd-cta h2').text()).toContain('Rokid')
    expect(wrapper.get('.xd-hero__desc').text()).toContain('夏鼎攜手 Rokid')
  })

  it('closes the mobile menu and opens login from the creation action', async () => {
    vi.stubGlobal('__BRAND_ID__', 'xiading-rokid')
    const { default: XiadingHomePage } = await import('../XiadingHomePage.vue')
    wrapper = mount(XiadingHomePage, { attachTo: document.body })
    await wrapper.get('.xd-nav__hamburger').trigger('click')
    expect(wrapper.get('.xd-nav__hamburger').attributes('aria-expanded')).toBe('true')
    await wrapper.get('.xd-nav__mobile button').trigger('click')

    expect(wrapper.get('.xd-nav__hamburger').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('[data-test="login-open"]').exists()).toBe(true)
  })
})
