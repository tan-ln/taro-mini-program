<template>
  <view :class="styles.areaFilterWrapper">
    <view :class="styles.searchArea">
      <View
        :class="['iconfont', 'icon-sousuo2', styles.searchIcon]"
      ></View>
      <input
        :class="styles.searchAreaInput"
        :placeholderClass="styles.placeholderStyle"
        placeholder="请输入"
      />
    </view>
    <view :class="styles.areaList">
      <view
        :class="[styles.areaItem, item === activeArea && styles.activeAreaItem]"
        v-for="item in props.tabDetail.data"
        :key="item"
        >
        {{ item }}
      </view>
    </view>
    <View :class="styles.buttonWrapper">
      <View :class="styles.resetButton">
        重置
      </View>
      <View :class="styles.confirmButton">
        <View :class="styles.buttonText">确定</View>{{' '}}
        <View :class="styles.selectCount">1</View>
      </View>
    </View>
  </view>
</template>

<script setup lang="ts">
import { TabItem } from '@/pages/home/types';
import styles from './index.module.less'
import { ref } from 'vue';

interface Props {
  tabDetail: TabItem & {
    data: string[]
  }
}
const props = defineProps<Props>()

const activeArea = ref<string>('全部领域')
</script>

<style scoped>

</style>