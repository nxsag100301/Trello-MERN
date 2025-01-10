import axios from 'axios'
import { API_ROOT } from './constants'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { userLogOutAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'

let axiosReduxStore
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

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

let refreshTokenPromise = null

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
    // Token không hợp lệ, refreshtoken hết hạn
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(userLogOutAPI(false))
    }
    // Lấy các api bị lỗi do accesstoken hết hạn statusCode = 410
    const originalRequests = error.config
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(userLogOutAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        // Bước 1: Nếu dự án cần lưu accessToken vào localStorage hoặc nơi khác thì xử lý ở đây
        // Dự án này không cần vì đã đính kèm 2 token ở cookie khi gửi request

        // Bước 2: Return lại axios instance kết hợp các originalRequests để gọi lại những api bị lỗi hết hạn accessToken
        return authorizeAxiosInstance(originalRequests)
      })
    }

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
