import { useCallback } from 'react'
import { debounce } from 'lodash'

// Tạo một custom hook để debounce function
export const useDebounceFn = (fnToDebounce, delay = 500) => {
  // Kiểm tra tham số đầu vào
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.')
  }

  if (typeof fnToDebounce !== 'function') {
    throw new Error('Debounce must have a function')
  }

  // Sử dụng useCallback để tránh re-render không cần thiết
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    debounce((...args) => {
      fnToDebounce(...args)
    }, delay),
    [fnToDebounce, delay]
  )
}
