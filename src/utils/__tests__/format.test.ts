import { formatPrice } from '@/utils/format'

describe('formatPrice', () => {
  it('should format price in cents to dollars', () => {
    expect(formatPrice(1000)).toBe('$10.00')
    expect(formatPrice(100)).toBe('$1.00')
    expect(formatPrice(1)).toBe('$0.01')
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('should handle large prices', () => {
    expect(formatPrice(100000)).toBe('$1,000.00')
    expect(formatPrice(1234567)).toBe('$12,345.67')
  })

  it('should handle decimal cents correctly', () => {
    expect(formatPrice(1234)).toBe('$12.34')
    expect(formatPrice(999)).toBe('$9.99')
  })

  it('should use USD currency format', () => {
    const result = formatPrice(1000)
    expect(result).toMatch(/\$/)
    expect(result).toMatch(/10\.00/)
  })
})
