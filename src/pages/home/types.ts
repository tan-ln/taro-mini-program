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