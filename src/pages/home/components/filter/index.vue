<template>
  <view
    id="homeFilter"
    :catchMove="showPanelFilter"
    :class="[styles.homeFilter, showPanelFilter && styles.onShowFilter]"
    :style="{
      position: 'sticky',
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
          @tap="setActiveTab(item)"
        >
          <view>{{ item.label }}</view>
          <View :class="styles.arrow"></View>
        </view>
      </template>

      <template v-slot:content>
        <component
          :is="activeTab.children"
          :tabDetail="activeTab"
        ></component>
      </template>
    </panel-wrapper>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRefs } from 'vue'
import panel from '../panel/index.vue'
import { ref } from 'vue'
import styles from './index.module.less'
import { getElementRect } from '@/utils'
import { changeScrollStatus, changeScrollHeight } from '@/hooks/usePageScrollEffect'
import { onMounted } from 'vue'
import areaFilter from './components/areaFilter.vue'
import fansFilter from './components/fansFilter.vue'
import platformFilter from './components/platformFilter.vue'
import typeFilter from './components/typeFilter.vue'
import { swiperEffect } from '../../utils'
import { getCondition } from '@/service/home'
import { fansNumFilterMap } from './data'
import { TabData, TabItem } from '../../types'

const defaultTabList: TabItem[] = [
  {
    label: '平台',
    value: 'platform',
    children: 'platformFilter',
  },
  {
    label: '粉丝',
    value: 'fans',
    children: 'fansFilter'
  },
  {
    label: '领域',
    value: 'area',
    children: 'areaFilter'
  },
  {
    label: '类型',
    value: 'type',
    children: 'typeFilter'
  },
]
const tabEffect = () => {
  const tabList = reactive<TabItem[]>([])
  Object.assign(tabList, defaultTabList)

  const activeTab = reactive<Partial<TabItem>>({})
  const setActiveTab = (item: TabItem) => {
    Object.assign(activeTab, item)
  }

  const fillTabData = (value: string, data: TabData) => {
    const idx = tabList.findIndex(v => v.value === value)
    idx !== -1 && (
      tabList[idx].data = data
    )
  }

  onMounted(() => {
    getCondition().then(resp => {
      const { annunciateLabel, Platform, CooperateType } = resp.data || {}
      const platform = Platform?.map(v => ({
        label: v.alias,
        value: v.index
      })).filter(v => v.label !== '微信') || []
      fillTabData('platform', [{
        label: '全部',
        value: ''
      }, ...platform])
      const types = CooperateType?.map(v => ({
        label: v.alias,
        value: v.index
      })) || []
      fillTabData('types', [{
        label: '全部类型',
        value: ''
      }, ...types])
      const area = annunciateLabel || []
      fillTabData('area', ['全部领域', ...area])
      const fansMap = fansNumFilterMap
      fillTabData('fans', fansMap)
    })
  })

  return toRefs({
    tabList,
    activeTab,
    setActiveTab
  })
}

export default defineComponent({
  components: {
    panelWrapper: panel,
    areaFilter,
    fansFilter,
    platformFilter,
    typeFilter,
  },
  setup () {
    const showPanelFilter = ref<boolean>(false)
    const pageTitleHeight = ref<number>(0)
    
    const tabEffectResult = tabEffect()
    const swiperHeight = swiperEffect()

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

    // const props = defineProps<{} & Params>()

    onMounted(async () => {
      const result = await getElementRect('#pageTitle')
      pageTitleHeight.value = result?.[0].height || 0
    })

    watch(showPanelFilter, (val) => {
      if (val) {
        changeScrollHeight(swiperHeight.value - pageTitleHeight.value * 2)
        // setScrollToViewElement('#homeFilter')
      }
      changeScrollStatus(!val)
    }, {
      flush: 'sync'
    })

    return {
      ...tabEffectResult,
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
