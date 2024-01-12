import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFetchJson } from './fetch-composable'

global.fetch = vi.fn()

vi.mock('./toasty-composable', () => ({
  useToasty: () => ({
    showToasty: vi.fn(),
  }),
}))

describe('useFetchJson composable', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    fetch.mockReset()
  })

  it('fetches data successfully', async () => {
    const mockData = { data: 'bar' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const { data, error, isFetching, execute } = useFetchJson('')
    await execute()

    expect(isFetching.value).toBe(false)
    expect(data.value).toEqual(mockData)
    expect(error.value).toBe(null)
  })

  it('handles fetch error', async () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
    }
    fetch.mockResolvedValueOnce({
      ok: false,
      ...mockError,
    })

    const { data, error, isFetching, execute } = useFetchJson('')
    await execute()

    expect(isFetching.value).toBe(false)
    expect(data.value).toBe(null)
    expect(error.value).toMatchObject(mockError)
  })

  it('uses custom fetch options', async () => {
    const mockData = { message: 'Updated' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const { data, execute } = useFetchJson('', {
      method: 'POST',
      body: JSON.stringify({ test: 'data' }),
    })
    await execute()

    expect(data.value).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'data' }),
    })
  })

  it('deletes the body for GET requests', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })

    const { execute } = useFetchJson('', {
      method: 'GET',
      body: JSON.stringify({ test: 'data' }),
    })
    await execute()

    expect(fetch).toHaveBeenCalledWith('', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  })
})
