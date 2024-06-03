<template>
  <view
    id="homeFilter"
    :catchMove="showPanelFilter"
    :class="[showPanelFilter && styles.onShowFilter]"
    :style="{
      top: pageTitleHeight + 'px'
    }"
    >
    <panel-wrapper
      v-model:active="showPanelFilter"
      @on-open="onOpen"
      @on-opened="onOpened"
      @on-close="onClose"
      @on-closed="onClosed"
      >
      <template v-slot:trigger>
        <view
          v-for="item in tabList" :key="item.value"
          :class="styles.tabItem"
        >
          <view>{{ item.label }}</view>
          <View :class="styles.arrow"></View>
        </view>
      </template>

      <template v-slot:content>
        <view>{{'我是 content'}}</view>
      </template>
    </panel-wrapper>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import panel from '../panel/index.vue'
import { toRefs, ref } from 'vue'
import styles from './index.module.less'
// import Taro from '@tarojs/taro'
import { getElementRect } from '@/utils'
import { changeScrollStatus, changeScrollHeight } from '@/hooks/usePageScrollEffect'
import { onMounted } from 'vue'

type TabItem = {
  label: string
  value: string
}
const defaultTabList: TabItem[] = [
  {
    label: '平台',
    value: 'platform'
  },
  {
    label: '粉丝',
    value: 'fans'
  },
  {
    label: '领域',
    value: 'area'
  },
  {
    label: '类型',
    value: 'type'
  },
]
const tabEffect = () => {
  const tabList = reactive<TabItem[]>([])
  Object.assign(tabList, defaultTabList)

  return toRefs({
    tabList
  })
}

export default defineComponent({
  components: {
    panelWrapper: panel
  },
  setup () {
    const showPanelFilter = ref<boolean>(false)
    const { tabList } = tabEffect()
    const pageTitleHeight = ref<number>(0)

    const onOpen = () => {
      console.log('onOpen')
    }
    const onOpened = () => {
      console.log('onOpened')
    }
    const onClose = () => {
      console.log('onClose')
    }
    const onClosed = () => {
      console.log('onClosed')
    }

    onMounted(async () => {
      const result = await getElementRect('#pageTitle')
      pageTitleHeight.value = result?.[0].height || 0
    })

    watch(showPanelFilter, (val) => {
      if (val) {
        changeScrollHeight(pageTitleHeight.value)
      }
      changeScrollStatus(!val)
    }, {
      flush: 'sync'
    })

    return {
      tabList,
      styles,
      showPanelFilter,
      pageTitleHeight,
      onOpen,
      onOpened,
      onClose,
      onClosed,
    }
  }
})
</script>
