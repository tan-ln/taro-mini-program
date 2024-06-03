<template>
  <view
    id="cardItem"
    :class="styles.cardItem"
    @click="handleToDetail"
  >
    <view :class="styles.titleWrap">
      <view :class="styles.left">
        <template v-if="notDouyinControl">
          <Image
            :src="getPlatformIcon(cardInfo.fdPlatformType)"
            mode="aspectFit"
            :class="styles.logo"
          />
        </template>
        <view
          :class="styles.title"
          :style="{
            color: cardInfo.alreadLooked === true ? '#999' : '#333'
          }"
        >
          {{ cardInfo.fdTitle }}
        </view>
      </view>
      <view :class="styles.right">
        <view :class="styles.number">
          <Text
            :class="`iconfont icon-guankanrenshu ${styles.see}`"
          ></Text>
          {{ formatNumber(cardInfo.fdLookNumber) }}
        </view>
      </view>
    </view>

    <view :class="styles.contentWrap">
      <view :class="styles.leftWrap">
        <view :class="styles.payInfo">
          <template v-if="cardInfo.fdPayType?.includes('赠品')">
            <template v-if="cardInfo.fdPayInfo">
              <view :class="styles.detail">
                <view :class="styles.info">
                  赠品：{{ cardInfo.fdPayInfo?.indexOf('送') === -1 ? '送' : '' }}
                  <view :class="styles.red">{{ cardInfo.fdPayInfo }}</view>
                </view>
                <view :class="styles.price">
                  , 价值<view :class="styles.red">{{ cardInfo.fdGiveawayPrice }}</view>
                </view>
              </view>
            </template>
            <text v-else>
              品牌：{{ cardInfo.fdBrand }}
            </text>
          </template>
          <template v-else>
            <text v-if="cardInfo.fdPayInfo">
              详情：{{ cardInfo.fdPayInfo }}
            </text>
            <text v-else>
              品牌：{{ cardInfo.fdBrand }}
            </text>
          </template>
        </view>
        <view :class="styles.blocks">
          <view :class="styles.cooperationType">
            {{ getCooperate }}
          </view>
          <view :class="styles.fans">
            {{ getFans }}
          </view>
          <view :class="styles.tags">
            <view v-for="(item, idx) in getTags" :class="styles.item" :key="idx">
              {{ item }}
            </view>
          </view>
        </view>
        <view :class="styles.cost">
          <view v-if="typeof cardInfo.fdBonus === 'number' && cardInfo.fdMaxBonus">
            ¥ {{ cardInfo.fdBonus }} - {{ cardInfo.fdMaxBonus }}
          </view>
          <view v-else-if="cardInfo.fdPayType === '赠品'">
            无费置换
          </view>
          <view v-else-if="cardInfo.fdIsSelfPrice">
            自报价
          </view>
        </view>
      </view>
      <view :class="[styles.imgWrap, styles.defaultImg]">
        <Image
          :class="`${styles.headImg} `"
          :src="formatImageSize"
          mode="aspectFill"
        />

        <template v-if="isFinished">
          <view style="color: '#fff'; font-size: '14px'" :class="styles.mask">
            <view
              :class="`${styles.finish} ${styles.showImg}`"
            >
              已结束
            </view>
          </view>
        </template>
        <template v-else>
          <view
            :class="`${styles.time}`"
          >
            {{ getResidueTime }}
          </view>
        </template>
        
        <template v-if="cardInfo.fdIsApply">
          <Image
            :src="applyTagImg"
            mode="aspectFit"
            :class="styles.flag"
          />
        </template>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import { getGlobalData } from '@/utils/globalData'
import applyTagImg from '@/assets/images/applyTag.png';
import { getPlatform, getCooperateType, formatFansAsks, calcResidueTime } from '../../utils'
import styles from './index.module.less'
import { resizeImg } from '@/utils';

export default defineComponent({
  props: ['cardInfo'],
  setup () {
    return {
      styles,
      applyTagImg,
      notDouyinControl: !getGlobalData('douyinControl'),
    }
  },
  computed: {
    getPlatformIcon () {
      return type => getPlatform(v => v.type === type)?.iconUrl
    },
    getCooperate () {
      return getCooperateType(this.cardInfo.fdCooperate)
    },
    getFans () {
      return formatFansAsks(
        this.cardInfo.fdFunsAsk,
        this.cardInfo.fdMaxFunsAsk,
        this.cardInfo.fdIsRestrictFuns
      )
    },
    getTags () {
      return this.cardInfo.fdIndustryAsk?.split(',') || []
    },
    isFinished () {
      return dayjs(this.cardInfo.fdEndTime).unix() < dayjs().unix()
    },
    getResidueTime () {
      return calcResidueTime(this.cardInfo.fdEndTime)
    },
    formatNumber () {
      return value => {
        if (value > 10000) {
          return '10000+';
        } else if (!value) {
          return '0';
        } else {
          return value;
        }
      }
    },
    formatImageSize () {
      return resizeImg({
        url: this.cardInfo.fdCover,
        width: 80
      })
    }
  },
  methods: {
    handleToDetail () {
      this.$emit('openDetail', this.cardInfo.id)
    }
  }
})
</script>
