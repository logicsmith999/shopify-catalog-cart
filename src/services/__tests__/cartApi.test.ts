import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveCartToApi, loadCartFromApi } from '@/services/cartApi'
import { mockCartItem } from '@/test/test-utils'

const mockMath = Object.create(global.Math)
global.Math = mockMath

describe('cartApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockMath.random = () => 0.5
  })

  describe('saveCartToApi', () => {
    it('should save cart successfully when API call succeeds', async () => {
      const result = await saveCartToApi([mockCartItem])

      expect(result.success).toBe(true)
      expect(result.data).toEqual([mockCartItem])
      expect(result.error).toBeUndefined()
    })

    it('should fail when API call fails', async () => {
      mockMath.random = () => 0.05

      const result = await saveCartToApi([mockCartItem])

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error: Failed to save cart')
      expect(result.data).toBeUndefined()
    })

    it('should include delay in API call', async () => {
      const startTime = Date.now()
      await saveCartToApi([mockCartItem])
      const endTime = Date.now()

      expect(endTime - startTime).toBeGreaterThanOrEqual(500)
    })

    it('should handle empty cart', async () => {
      const result = await saveCartToApi([])

      expect(result.success).toBe(true)
      expect(result.data).toEqual([])
    })
  })

  describe('loadCartFromApi', () => {
    it('should load cart successfully when API call succeeds', async () => {
      const result = await loadCartFromApi()

      expect(result.success).toBe(true)
      expect(result.data).toEqual([])
      expect(result.error).toBeUndefined()
    })

    it('should fail when API call fails', async () => {
      mockMath.random = () => 0.05

      const result = await loadCartFromApi()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error: Failed to save cart')
      expect(result.data).toBeUndefined()
    })

    it('should include delay in API call', async () => {
      const startTime = Date.now()
      await loadCartFromApi()
      const endTime = Date.now()

      expect(endTime - startTime).toBeGreaterThanOrEqual(1000)
    })
  })

  describe('error handling', () => {
    it('should handle unexpected errors in saveCartToApi', async () => {
      const originalSetTimeout = global.setTimeout
      global.setTimeout = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected error')
      }) as unknown as typeof global.setTimeout

      const result = await saveCartToApi([mockCartItem])

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unexpected error')

      global.setTimeout = originalSetTimeout
    })
  })
})
