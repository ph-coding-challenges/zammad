import { onMounted, ref } from 'vue'

function useCustomFetch(initialUrl, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    immediate = false,
  } = options

  const data = ref(null)
  const error = ref(null)
  const isFetching = ref(false)

  const execute = async (executeOptions = {}) => {
    const { url = initialUrl, ...optionsOverrides } = executeOptions

    isFetching.value = true
    error.value = null
    data.value = null

    try {
      const fetchOptions = {
        method,
        headers,
        body,
        ...optionsOverrides,
      }

      // If method is GET or HEAD, delete the body property as it should not be used with these methods
      if (method === 'GET' || method === 'HEAD') delete fetchOptions.body

      const response = await fetch(url, fetchOptions)

      if (!response.ok) throw response

      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      isFetching.value = false
    }
  }

  // immediate is false by default, so the request won't
  // be executed automatically, unless manually set to
  // true with { immediate: true }
  if (immediate) onMounted(execute)

  return { data, error, isFetching, execute }
}

// eslint-disable-next-line import/prefer-default-export
export function useFetchJson(url, options) {
  const headers = {
    ...options?.headers,
    'Content-Type': 'application/json',
  }

  return useCustomFetch(url, { ...options, headers })
}
