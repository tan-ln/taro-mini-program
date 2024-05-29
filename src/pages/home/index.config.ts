export default definePageConfig({
  navigationBarTitleText: '广场',
  navigationStyle: process.env.TARO_ENV === 'weapp' ? 'custom' : 'default',
  enablePullDownRefresh: true,
  onReachBottomDistance: 800,
  enableShareAppMessage: true,
  backgroundTextStyle: 'dark',
})
