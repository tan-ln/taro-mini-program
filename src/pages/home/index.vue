<template>
  <view>
    <!-- 头部搜素框部分 -->
    <view
      :class="styles.pageTitle"
      :style="topNavSearchBarStyle"
    >
      <view :class="styles.searchBtn" @click="handleToSearch">
        <view :class="['iconfont', 'icon-sousuo2', styles.icon]"></view>
        <view :class="styles.text">搜索标题找通告</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { getGlobalData } from '@/utils/globalData'
import styles from './index.module.less'

export default {
  setup () {
    const ENV = process.env.TARO_ENV
    // 状态栏高度
    const statusHeight = getGlobalData('statusHeight');
    // 导航栏的高度
    const navHeight = getGlobalData('navHeight');

    const scrollTop = 0

    // navBar背景色
    const navBarBackColor = (min = 0, max = 1) => {
      return max
      // if (process.env.TARO_ENV === 'tt') {
      //   return max;
      // }
      // if (scrollTop <= 10) {
      //   return min;
      // } else if (scrollTop >= swiperRef.current - titleClientHeightRef.current) {
      //   return max;
      // } else {
      //   return (
      //     scrollTop / (swiperRef.current - titleClientHeightRef.current) + min
      //   );
      // }
    };

    const topNavSearchBarStyle: Record<string | number, string | number>  = {
      height: ENV === 'weapp'
        ? `${statusHeight + navHeight + 4}px`
        : `${navHeight}px`,
      paddingTop:
        ENV === 'weapp' ? `${statusHeight - 4}px` : 0,
      backgroundColor: `rgba(246, 246, 246, ${navBarBackColor()})`,
      position: scrollTop >= 5 ? 'fixed' : 'absolute',
    }

    return {
      styles,
      topNavSearchBarStyle
    }
  },
  methods: {
    handleToSearch () {}
  }
}
</script>

<!-- <script>
import { ref } from 'vue'

export default {
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script> -->
