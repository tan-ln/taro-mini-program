import { ref } from "vue"

export const enableScroll = ref<boolean>(true)

export const scrollTop = ref<number>(0)
export const scrollHeight = ref<number>(0)

export const changeScrollStatus = (newStatus) => {
  enableScroll.value = newStatus
}

export const changeScrollHeight = (val) => {
  scrollHeight.value = val
}

export const onScroll = (e) => {
  // console.log(e)
  scrollTop.value = e.detail.scrollTop
}