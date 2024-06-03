<template>
  <view :class="styles.swiperWrap">
    <swiper
      circular
      autoplay
      :onTransition="handleTransition"
      :onAnimationFinish="animationFinish"
      :class="styles.swiper"
    >
      <view>
        <!-- 文字 -->
        <template v-for="(item) in topSwiperList" :key="item.fdBannerPic">
          <swiper-item :class="styles.swiperItem">
            <Image
              :src="'https:' + item.fdBannerPic"
              mode="aspectFill"
              :class="styles.img"
              @click="handlePreviewPicture"
            ></Image>
          </swiper-item>
        </template>
        <!-- 底图 -->
        <view :class="styles.backPicsWrap" ref="bottomImgRef">
          <template v-for="item in bottomSwiperList" :key="item.fdBannerPic">
            <Image
              :src="'https:' + item.fdBannerPic"
              mode="aspectFill"
              :class="styles.img"
            ></Image>
          </template>
        </view>
      </view>
    </swiper>
  </view>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import request from '@/utils/request'
import styles from './index.module.less'

type Banner = {
  fdBannerLink?: string
  fdBannerPic: string
  fdGroupOrder: number
  fdStatus: boolean
}

const fetchBanner = () => {
  return request<Banner[]>({
    url: '/anon/annunciate/annunciateBanner/v2'
  })
}

const bannerEffect = () => {
  const topSwiperList = reactive<Banner[]>([])
  const bottomSwiperList = reactive<Banner[]>([])

  fetchBanner().then(resp => resp.data || []).then((res) => {
    res.map(item => {
      topSwiperList.push(item[0])
      bottomSwiperList.push(item[1])
    })

    // imgsRef.current.childNodes.forEach((item, idx) => {
    //   item.style.opacity = '0';
    //   if (idx === currentSwiperItem) {
    //     item.style.opacity = '1';
    //   }
    // });
  })

  return {
    topSwiperList,
    bottomSwiperList
  }
}

export default {
  components: {
    Swiper,
    SwiperItem,
    Image,
  },
  setup () {
    const bottomImgRef = ref<HTMLElement | null>(null)
    
    const { topSwiperList, bottomSwiperList } = bannerEffect()

    return {
      styles,
      topSwiperList, bottomSwiperList,
      bottomImgRef
    }
  },
  methods: {
    handleTransition () {},
    animationFinish () {},
    handlePreviewPicture () {}
  }
}
</script>
