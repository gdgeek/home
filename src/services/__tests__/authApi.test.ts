/**
 * Validates: Requirements 15.4
 *
 * Unit tests for authApi:
 * - Uses primary API when health check succeeds
 * - Fails over to backup API when primary health check fails
 * - Throws SERVER_UNAVAILABLE when both APIs fail
 * - Handles login error codes correctly
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

const PRIMARY_URL = 'https://api.primary.test'
const BACKUP_URL = 'https://api.backup.test'

const mockLoginSuccess = {
  success: true,
  message: 'ok',
  token: { accessToken: 'acc', expires: '2099-01-01', refreshToken: 'ref' },
}

beforeEach(() => {
  ;(window as unknown as Record<string, unknown>).__API_URL__ = PRIMARY_URL
  ;(window as unknown as Record<string, unknown>).__BACKUP_API_URL__ = BACKUP_URL
  vi.clearAllMocks()
  localStorage.clear()
})

afterEach(() => {
  delete (window as unknown as Record<string, unknown>).__API_URL__
  delete (window as unknown as Record<string, unknown>).__BACKUP_API_URL__
  vi.resetModules()
})

/**
 * Always get a fresh module import to reset the module-level `cachedApiUrl`.
 */
async function getFreshLogin() {
  vi.resetModules()
  const { login, AuthError } = await import('../authApi')
  return { login, AuthError }
}

describe('authApi', () => {
  describe('login - primary API available', () => {
    it('uses primary API when health check succeeds', async () => {
      mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: { status: 'healthy' } })
      mockedAxios.post = vi.fn().mockResolvedValue({ data: mockLoginSuccess })

      const { login } = await getFreshLogin()
      const result = await login('user', 'pass')

      expect(result.success).toBe(true)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(PRIMARY_URL),
        expect.any(Object),
      )
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining(PRIMARY_URL),
        expect.any(Object),
      )
    })

    it('stores tokens in localStorage on success', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: { status: 'healthy' } })
      mockedAxios.post = vi.fn().mockResolvedValue({ data: mockLoginSuccess })

      const { login } = await getFreshLogin()
      await login('user', 'pass')

      expect(localStorage.getItem('accessToken')).toBe('acc')
      expect(localStorage.getItem('refreshToken')).toBe('ref')
    })
  })

  describe('login - primary API unavailable, failover to backup', () => {
    it('falls back to backup API when primary health check fails', async () => {
      mockedAxios.get = vi.fn()
        .mockRejectedValueOnce(new Error('timeout'))            // primary health fails
        .mockResolvedValueOnce({ data: { status: 'healthy' } }) // backup health ok
      mockedAxios.post = vi.fn().mockResolvedValue({ data: mockLoginSuccess })

      const { login } = await getFreshLogin()
      const result = await login('user', 'pass')

      expect(result.success).toBe(true)
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining(BACKUP_URL),
        expect.any(Object),
      )
    })

    it('throws SERVER_UNAVAILABLE when both APIs fail health check', async () => {
      mockedAxios.get = vi.fn()
        .mockRejectedValueOnce(new Error('timeout')) // primary health fails
        .mockRejectedValueOnce(new Error('timeout')) // backup health fails

      const { login, AuthError } = await getFreshLogin()

      await expect(login('user', 'pass')).rejects.toThrow(AuthError)
      await expect(login('user', 'pass')).rejects.toMatchObject({ code: 'SERVER_UNAVAILABLE' })
    })
  })

  describe('login - error handling', () => {
    it('throws AuthError with NO_USER code for unknown user', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: { status: 'healthy' } })
      const axiosError = Object.assign(new Error('no user'), {
        response: { data: { message: 'no user' }, status: 401 },
      })
      mockedAxios.post = vi.fn().mockRejectedValue(axiosError)

      const { login } = await getFreshLogin()
      await expect(login('bad', 'pass')).rejects.toMatchObject({ code: 'NO_USER' })
    })

    it('throws AuthError with WRONG_PASSWORD code for wrong password', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: { status: 'healthy' } })
      const axiosError = Object.assign(new Error('wrong password'), {
        response: { data: { message: 'wrong password' }, status: 401 },
      })
      mockedAxios.post = vi.fn().mockRejectedValue(axiosError)

      const { login } = await getFreshLogin()
      await expect(login('user', 'wrong')).rejects.toMatchObject({ code: 'WRONG_PASSWORD' })
    })
  })
})
