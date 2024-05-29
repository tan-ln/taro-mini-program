import Taro from "@tarojs/taro";
import { HTTP_STATUS, HTTP_STATUS_MAP, baseOption, getBaseUrl } from "./request.config";

export interface ResponseDTO<T> {
  success?: boolean
  code?: number
  message?: string
  data?: T
}

export interface Params extends Taro.request.Option{
  showLoading?: boolean
}

// 请求拦截器
const requestInterceptor = (chain: Taro.Chain) => {
  const requestParams = chain.requestParams
  const { header } = requestParams
  let token = ''
  const tokenHeader = {
    Authorization: `Bearer ${token}`,
  };
  requestParams.header = { ...tokenHeader, ...header }
  return chain.proceed(requestParams)
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [requestInterceptor]
interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem))

const request = <T extends object>(params: Params): Promise<ResponseDTO<T>> => {
  const { url, header, showLoading = false } = params;
  const baseUrl = getBaseUrl()
  const options: Taro.request.Option = {
    ...baseOption,
    ...params,
    url: baseUrl + url,
    header: {
      ...baseOption.header,
      ...header
    }
  }

  showLoading && Taro.showLoading({
    title: "加载中",
  })

  return Taro.request(options)
    .then((res: Taro.request.SuccessCallbackResult<any>) => {
      const pos = options.header!['content-type'].indexOf("application/json");
      const { statusCode, data } = res;
      if (pos == -1) {
        return { success: true, data };
      }
      const dto: ResponseDTO<T> = {
        success: true,
        data,
        code: 0,
        message: `http status: ${statusCode}`,
      }

      // 错误处理
      const badRequest = HTTP_STATUS_MAP.get(String(statusCode))
      if (badRequest) {
        dto.success = false
        dto.data = undefined
        dto.message = badRequest
      }

      return Promise.resolve(dto)
    })
    .catch((error) => {
      console.error("http return error,", error);
      return Promise.resolve({
      });
    })
    .finally(() => Taro.hideLoading())
}

export default request
