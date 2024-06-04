<template>
  <view :class="styles.platformList">
    <view :class="styles.platformItem" v-for="item in props.tabDetail.data" :key="item.value">
      <Image
        :src="getPlatformIcon(item.label)"
        mode="aspectFit"
        :class="styles.logo"
      />
      <text :class="styles.platformText">{{ item.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Options, TabItem } from '@/pages/home/types';
import { platform_map } from '@/pages/home/utils';
import styles from './index.module.less'

interface Props {
  tabDetail: TabItem & {
    data: Options[]
  }
}
const props = defineProps<Props>()

const getPlatformIcon = (label: string) => {
  return platform_map.find(v => label.includes(v.title) || label.includes(v.alias as string))?.roundIconUrl
}
</script>

<style scoped>

</style>