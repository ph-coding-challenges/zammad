import { describe, it, expect } from 'vitest'
import { useToasty } from './toasty-composable'

describe('useToasty composable', () => {
  it('initial state', () => {
    const { show, message, type } = useToasty()
    expect(show.value).toBe(false)
    expect(message.value).toBe('')
    expect(type.value).toBe('success')
  })

  it('showToasty updates state correctly with default type', () => {
    const { show, message, type, showToasty } = useToasty()
    showToasty('Test message')
    expect(show.value).toBe(true)
    expect(message.value).toBe('Test message')
    expect(type.value).toBe('success')
  })

  it('showToasty updates state correctly with custom type', () => {
    const { show, message, type, showToasty } = useToasty()
    showToasty('Another test message', 'error')
    expect(show.value).toBe(true)
    expect(message.value).toBe('Another test message')
    expect(type.value).toBe('error')
  })
})
