<template>
  <view :class="[styles.panelWrapper]">
    <!-- 触发区域 -->
    <view :class="styles.panelTrigger" @tap="onClickTrigger(true)">
      <slot name="trigger"></slot>
    </view>
    <!-- 内容区域 -->
    <transition>
      <view v-if="open" :class="[styles.panelContent, styles.onShowContent]" :style="{
        'animation-delay': ($props.delay || 0) + 'ms'
      }">
        <slot name="content"></slot>
      </view>
    </transition>
    <!-- 遮罩 -->
    <view v-if="open" :class="styles.panelMask" @tap="onClickTrigger(false)"></view>
  </view>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import styles from './index.module.less'
import { _delay } from '@/utils';

interface Props {
  active: boolean
  delay?: number
}
const props = withDefaults(defineProps<Props>(), {
  active: false,
  delay: 0
})

const emit = defineEmits(['update:active', 'onOpen', 'onOpened', 'onClose', 'onClosed'])

const open = ref<boolean>(props.active)
const timer = ref<NodeJS.Timeout>()

const onClickTrigger = (val) => {
  emit('update:active', val)
}

watch(() => props.active,  (val) => {
  open.value = val
})

watch(() => open, (val) => {
  emit(val ? 'onOpen' : 'onClose')
})

watch(() => open, (val) => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(() => {
    emit(val ? 'onOpened' : 'onClosed')
    clearTimeout(timer.value)
  }, 260);
}, {
  flush: 'post'
})
</script>
