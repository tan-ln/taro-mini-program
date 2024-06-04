import request from '@/utils/request'
import { Params, CardListResult, Options, Condition } from '@/pages/home/types'

/**
 * 列表
 * @param params 
 * @returns 
 */
export const fetchCardList = (params: Params) => {
  return request<CardListResult>({
    url: '/anon/annunciate/list',
    data: {
      ...params
    }
  })
}

/**
 * 平台
 * @returns 
 */
export const getPlatformType = () => {
  return request<Options>({ url: '/anon/annunciate/platformType' })
}

interface ConditionsResult {
  annunciateLabel: string[]
  Platform: Condition[]
  CooperateType: Condition[]
}
// 筛选条件
export const getCondition = () => {
  return request<ConditionsResult>({ url: '/anon/annunciate/constant' })
}
