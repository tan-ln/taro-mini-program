export interface Params {
  pageIndex?: number
  limit?: number
  platformType?: number
  minFansAsk?: number
  maxFansAsk?: number
  industryAsk?: number[]
  cooperateType?: number
}
export interface Card {
  id: string
  fdAnnunciateType: number
  fdTitle: string
  fdCover: string
  fdIndustryAsk: string
  fdBrand: string
  fdWechat: string
  fdPayType: string
  fdPlatformType: number
  fdRecruitmentNum: number
}
export interface CardListResult {
  data: Card[]
  pageCount: number
  pageSize: number
  total: number
}

export type Options = {
  label: string
  value: number | string
}

export interface Condition {
  alias: string
  index: number
}

export type TabData = Options[] | string[] | {
  minFans: string
  maxFans: string
  id: number
}[]

export interface TabItem {
  label: string
  value: string
  children?: any
  data?: TabData
}
