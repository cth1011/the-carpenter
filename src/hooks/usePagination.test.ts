import { renderHook } from '@testing-library/react'
import { usePagination, DOTS } from './usePagination'
describe('usePagination', () => {
  it('should return the correct range when total pages is less than page numbers', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 5, pageSize: 1, currentPage: 1 }),
    )
    expect(result.current).toEqual([1, 2, 3, 4, 5])
  })

  it('should return dots at the end when current page is near the beginning', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 10, pageSize: 1, currentPage: 2 }),
    )
    expect(result.current).toEqual([1, 2, 3, 4, 5, DOTS, 10])
  })

  it('should return dots at the beginning when current page is near the end', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 10, pageSize: 1, currentPage: 9 }),
    )
    expect(result.current).toEqual([1, DOTS, 6, 7, 8, 9, 10])
  })

  it('should return dots at both ends when current page is in the middle', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 20, pageSize: 1, currentPage: 10 }),
    )
    expect(result.current).toEqual([1, DOTS, 9, 10, 11, DOTS, 20])
  })

  it('should handle siblingCount correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 20,
        pageSize: 1,
        currentPage: 10,
        siblingCount: 2,
      }),
    )
    expect(result.current).toEqual([1, DOTS, 8, 9, 10, 11, 12, DOTS, 20])
  })
})
