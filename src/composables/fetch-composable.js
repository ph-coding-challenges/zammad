import { onMounted, ref } from 'vue'
import { useToasty } from './toasty-composable'

const { showToasty } = useToasty()

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
      const ERRORS_DICTIONARY = {
        400: 'Bad request. Please check your request and try again.',
        401: 'Unauthorized. Please log in and try again.',
        404: 'Not found. The requested resource could not be found.',
        500: 'Internal server error. Something went wrong on our end.',
        503: 'Service unavailable. The server is currently unable to handle the request.',
        504: 'Gateway timeout. The server took too long to respond.',
      }

      error.value = err

      showToasty(
        `[${err.status}] ${
          err.statusText ? err.statusText : ERRORS_DICTIONARY[err.status]
        }`,
        'error',
      )
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
