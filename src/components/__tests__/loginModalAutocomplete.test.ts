import { describe, expect, it } from 'vitest'
import loginModalSource from '../common/LoginModal.vue?raw'

describe('LoginModal credential autofill semantics', () => {
  it('exposes a named username field to password managers', () => {
    expect(loginModalSource).toContain('name="username"')
    expect(loginModalSource).toContain('autocomplete="username"')
  })

  it('exposes the existing-account password field as current-password', () => {
    expect(loginModalSource).toContain('name="password"')
    expect(loginModalSource).toContain('autocomplete="current-password"')
  })

  it('submits through a semantic form without persisting credentials in app code', () => {
    expect(loginModalSource).toContain('autocomplete="on" @submit.prevent="handleLogin"')
    expect(loginModalSource).toContain('native-type="submit" :form="LOGIN_FORM_ID"')
    expect(loginModalSource).not.toContain('autocomplete="off"')
  })
})
