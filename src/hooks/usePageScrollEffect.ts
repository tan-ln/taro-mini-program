import { ref, watch } from "vue"

export const enableScroll = ref<boolean>(true)

export const scrollTop = ref<number>(0)
export const scrollHeight = ref<number>(0)

export const toViewElement = ref<string>('')

export const changeScrollStatus = (newStatus) => {
  enableScroll.value = newStatus
}

export const changeScrollHeight = (val) => {
  scrollHeight.value = val
}

export const onScroll = (e) => {
  // console.log('onscroll', e)
  scrollTop.value = e.detail.scrollTop
  scrollHeight.value = 0
}

export const onScrollEnd = (e) => {
  console.log(e)
  scrollHeight.value = e.detail.scrollTop
}

export const setScrollToViewElement = (selector) => {
  toViewElement.value = selector
}

watch(scrollHeight, (val) => {
  console.log('scrollHeight', val)
})