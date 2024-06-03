import Taro from "@tarojs/taro";
import { ref, toRefs } from "vue";

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

// cdn图片自定义大小函数
export const resizeImg = ({ url, width }: {
  url: string
  width: number
}) => {
  if (!url) return url
  const whiteList = ['cdn.luonet', 'luonetoss.oss-cn-hangzhou.aliyuncs'];
  const host = /^(?:(https:\/\/))?(\S+).com/.exec(url)?.[2]
  if (host && whiteList.includes(host)) {
    url = `${url}?x-oss-process=image/resize,w_${width}`;
  }

  if (url && !url.startsWith('http')) {
    url = 'https://' + url
  }
  return url;
};

/**
 * 获取元素高度
 */
export const getElementRect = (querySelector) => {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .selectAll(querySelector)
      .boundingClientRect((res) => {
        resolve(res)
      })
      .exec();
  })
}

export const _delay = (delay) => {
  if (!delay) return true
  return new Promise((resolve) =>{ 
    const timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, delay)
  })
}

export const usePageScrollEffect = () => {
  const enableScroll = ref<boolean>(true)
  const changeStatus = (newStatus) => {
    enableScroll.value = newStatus
  }
  return {
    enableScroll,
    changeStatus
  }
}