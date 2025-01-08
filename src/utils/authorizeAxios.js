import axios from 'axios'
import { API_ROOT } from './constants'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'

let authorizeAxiosInstance = axios.create({
  baseURL: API_ROOT
})

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizeAxiosInstance.defaults.withCredentials = true

// Interceptors Request
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Interceptors Response
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false)
    // console.log('err:', error)
    let errMessage = error?.message
    if (error.response?.data?.message) {
      errMessage = error.response?.data?.message
    }
    if (error.response?.status !== 410) {
      toast.error(errMessage)
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
