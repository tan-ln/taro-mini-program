import Taro from "@tarojs/taro";

/**
 * 获取当前页 url
 * @returns string url
 */
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages()
  const currentPage = pages.slice(-1)[0] || {}
  const { route } = currentPage
  return route
}


