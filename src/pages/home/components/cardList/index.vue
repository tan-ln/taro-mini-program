<template>
  <view :class="styles.cardList">
    <card-item
      v-for="item in data"
      :key="item.id"
      :cardInfo="item"
    ></card-item>
  </view>
</template>

<script lang="ts" setup>
import { Card } from '../../types';
import CardItem from '../cardItem/index.vue'
import styles from './index.module.less'

interface Props {
  data: Card[]
}
defineProps<Props>()
</script>
