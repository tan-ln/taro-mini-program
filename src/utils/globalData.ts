const globalData = {}

export function setGlobalData (key: string, val: any) {
  globalData[key] = val
}

export function getGlobalData (key: string) {
  return globalData[key]
}