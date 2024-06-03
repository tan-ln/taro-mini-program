<template>
  <scroll-view
    :scroll-y="enableScroll"
    :scroll-top="scrollHeight"
    :scroll-with-animation="true"
    :scroll-animation-duration="200"
    scroll-into-view-alignment="end"
    :style="{
      width: '100%',
      height: '100%'
    }"
    @scroll="onScroll"
    >
    <!-- 头部搜素框部分 -->
    <view
      id="pageTitle"
      :class="styles.pageTitle"
      :style="{
        ...topNavSearchBarStyle,
        position: scrollTop >= 5 || scrollHeight ? 'fixed' : 'absolute',
        backgroundColor: `rgba(246, 246, 246, ${searchTitleBgRate})`,
      }"
    >
      <view :class="styles.searchBtn" @click="handleToSearch">
        <view :class="['iconfont', 'icon-sousuo2', styles.icon]"></view>
        <view :class="styles.text">搜索标题找通告</view>
      </view>
    </view>

    <!-- 轮播图 -->
    <view v-if="ENV === 'weapp'" id="swiperWrapper">
      <swiper-wrapper />
    </view>

    <!-- 筛选 -->
    <filter-wrapper></filter-wrapper>

    <card-list
      :data="cardList"
      test="123"
      @test="handleToSearch"
    ></card-list>
  </scroll-view>
</template>

<script lang="ts">
import { ref, reactive, watch } from 'vue'
import { useReady, createSelectorQuery } from '@tarojs/taro'
import { getGlobalData } from '@/utils/globalData'
import request from '@/utils/request'
import swiperWrapper from './components/swiper/index.vue'
import cardList from './components/cardList/index.vue'
import filterWrapper from './components/filter/index.vue'
import { enableScroll, scrollTop, scrollHeight, onScroll, onScrollEnd } from '@/hooks/usePageScrollEffect'
import { Params, Card, CardListResult } from './types'
import { swiperEffect } from './utils'
import styles from './index.module.less'

const fetchCardList = (params: Params) => {
  return request<CardListResult>({
    url: '/anon/annunciate/list',
    data: {
      ...params
    }
  })
}

const cardListEffect = () => {
  const params = reactive<Params>({
    pageIndex: 1,
    limit: 20,
    // platformType: undefined,
    // minFansAsk: undefined,
    // maxFansAsk: undefined,
    // industryAsk: undefined,
    // cooperateType: undefined,
  })
  const cardList = reactive<Card[]>([])

  fetchCardList(params).then(resp => resp.data).then((res) => {
    if (!res) return
    Object.assign(cardList, res.data || [])
  })

  return {
    cardList
  }
}

const searchTitleEffect = () => {
  const ENV = process.env.TARO_ENV
  // 状态栏高度
  const statusHeight = getGlobalData('statusHeight');
  // 导航栏的高度
  const navHeight = getGlobalData('navHeight');
  // 轮播图高度
  const swiperHeight = swiperEffect()

  const searchTitleHeight = ref(0)
  const searchTitleBgRate = ref(0)
  const max = 1
  const min = 0

  useReady(() => {
    const query = createSelectorQuery();
    query
      .selectAll('#pageTitle')
      .boundingClientRect((res) => {
        searchTitleHeight.value = res[0]
          ? res[0].height
          : statusHeight + navHeight + 4; // taro上会出现onReady周期里面获取不到dom的可能性，所以用一个大概的高度兜底
      })
      .exec();
  })

  watch(scrollTop, () => {
    if (ENV === 'tt' || scrollHeight) {
      searchTitleBgRate.value = max
    }

    if (scrollTop.value <= 10) {
      searchTitleBgRate.value = min;
    } else if (scrollTop.value >= swiperHeight.value - searchTitleHeight.value) {
      searchTitleBgRate.value = max;
    } else {
      searchTitleBgRate.value = (
        scrollTop.value / (swiperHeight.value - searchTitleHeight.value)
      );
    }
  }, {
    flush: 'pre'
  })

  return searchTitleBgRate
}

export default {
  components: {
    swiperWrapper,
    cardList,
    filterWrapper
  },
  setup () {
    const ENV = process.env.TARO_ENV
    // 状态栏高度
    const statusHeight = getGlobalData('statusHeight');
    // 导航栏的高度
    const navHeight = getGlobalData('navHeight');

    const searchTitleBgRate = searchTitleEffect()

    const topNavSearchBarStyle: Record<string | number, string | number>  = {
      height: ENV === 'weapp'
        ? `${statusHeight + navHeight + 4}px`
        : `${navHeight}px`,
      paddingTop:
        ENV === 'weapp' ? `${statusHeight - 4}px` : 0,
    }

    const { cardList } = cardListEffect()
    return {
      styles,
      topNavSearchBarStyle,
      ENV,
      cardList,
      scrollTop,
      scrollHeight,
      searchTitleBgRate,
      enableScroll,
      onScroll,
      onScrollEnd
    }
  },
  methods: {
    handleToSearch () {},
  }
}
</script>
