import { ref, } from 'vue'
import { useReady, createSelectorQuery, NodesRef } from '@tarojs/taro'
import { getGlobalData } from '@/utils/globalData'
import dayjs from "dayjs"

export const platform_map = [
  {
    type: 1,
    title: '小红书',
    iconUrl: require('@/assets/images/home_smallred.png')
  },
  {
    type: 2,
    title: '抖音',
    iconUrl: require('@/assets/images/home_douyin.png')
  },
  {
    type: 3,
    title: '微信',
    iconUrl: require('@/assets/images/icon/weChart.png')
  },
  {
    type: 4,
    title: '微博',
    iconUrl: require('@/assets/images/home_weibo.png')
  },
  {
    type: 5,
    title: 'Bilibili',
    iconUrl: require('@/assets/images/home_bilibili.png')
  },
]

export const getPlatform = (fn)=> {
  const target = platform_map.find(fn)
  return target
}

export const cooperateType_Map = [
  {
    type: 1,
    title: '图文'
  },
  {
    type: 2,
    title: '视频'
  },
  {
    type: 3,
    title: '图文视频'
  },
]
export const getCooperateType = (type: number) => {
  return type
    ? cooperateType_Map.find(v => v.type === type)?.title
    : cooperateType_Map.slice(-1)[0].title
}

export const formatFansAsks = function (
  fansAsk,
  maxFansAsk,
  fdIsRestrictFuns = false
) {
  if (!fdIsRestrictFuns) {
    // return '粉丝不限';
  }
  if (fansAsk === 0) {
    return '粉丝不限';
  }
  let min: string | number = 0;
  let max: string | number = 0;
  if (fansAsk >= 10000) {
    if (fansAsk % 10000 === 0) {
      min = `${fansAsk / 10000}w`;
    } else if (fansAsk % 10000 > 0 && fansAsk % 10000 < 1000) {
      min = `${Math.ceil(fansAsk / 10000).toFixed(1)}w`;
    } else if (fansAsk % 10000 >= 1000) {
      min = `${(fansAsk / 10000).toFixed(1)}w`;
    }
  } else if (fansAsk >= 1000) {
    if (fansAsk % 1000 === 0) {
      min = `${fansAsk / 1000}k`;
    } else if (fansAsk % 1000 > 0 && fansAsk % 1000 < 100) {
      min = `${Math.ceil(fansAsk / 1000).toFixed(1)}k`;
    } else if (fansAsk % 1000 >= 100) {
      min = `${(fansAsk / 1000).toFixed(1)}k`;
    }
  } else if (fansAsk > 0) {
    min = `${fansAsk}`;
  }

  if (maxFansAsk >= 10000) {
    if (maxFansAsk % 10000 === 0) {
      max = `${maxFansAsk / 10000}w`;
    } else if (maxFansAsk % 10000 > 0 && maxFansAsk % 10000 < 1000) {
      max = `${Math.ceil(maxFansAsk / 10000).toFixed(1)}w`;
    } else if (maxFansAsk % 10000 >= 1000) {
      max = `${(maxFansAsk / 10000).toFixed(1)}w`;
    }
  } else if (maxFansAsk >= 1000) {
    if (maxFansAsk % 1000 === 0) {
      max = `${maxFansAsk / 1000}k`;
    } else if (maxFansAsk % 1000 > 0 && maxFansAsk % 1000 < 100) {
      max = `${Math.ceil(maxFansAsk / 1000).toFixed(1)}k`;
    } else if (maxFansAsk % 1000 >= 100) {
      max = `${(maxFansAsk / 1000).toFixed(1)}k`;
    }
  } else if (maxFansAsk > 0) {
    max = `${maxFansAsk}`;
  }
  if (maxFansAsk > 0) {
    return `${min} ~ ${max}`;
  } else {
    return `${min}以上`;
  }
};

// 计算当前通告是否结束，传入参数为通告结束时间,返回值为显示文本
export const calcResidueTime = (endTime) => {
  const endTimestamp = dayjs(endTime).unix();
  const curTimestamp = dayjs().unix();
  const diffTime = endTimestamp - curTimestamp;
  if (diffTime <= 0) {
    return '';
  } else if (diffTime > 0 && diffTime < 86400) {
    const hour = Math.floor(diffTime / 3600);
    const minute = Math.floor((diffTime % 3600) / 60);
    return `${hour}小时${minute}分`;
  } else if (diffTime >= 86400) {
    const day = Math.floor(diffTime / 86400);
    const hour = Math.floor((diffTime % 86400) / 3600);
    return `${day}天${hour}小时`;
  }
};

export const swiperEffect = () => {
  const swiperHeight = ref(0)
  useReady(() => {
  if (!getGlobalData('douyinControl')) {
      createSelectorQuery()
        .select('#swiperWrapper')
        .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
          console.log(res)
          swiperHeight.value = res?.bottom
        })
        .exec();
    }
  })
  return swiperHeight
}