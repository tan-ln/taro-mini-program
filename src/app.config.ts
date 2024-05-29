export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/function/index',
    'pages/creativity/index',
    'pages/user/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#B3B3B3',
    selectedColor: '#FF4C61',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '广场',
        iconPath: './assets/images/tab/home.png',
        selectedIconPath: './assets/images/tab/home_active.png',
      },
      {
        pagePath: 'pages/function/index',
        text: '通告',
        iconPath: './assets/images/tab/func.png',
        selectedIconPath: './assets/images/tab/func_active.png',
      },
      {
        pagePath: 'pages/creativity/index',
        text: '创意',
        iconPath: './assets/images/tab/originality.png',
        selectedIconPath: './assets/images/tab/originality_active.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: './assets/images/tab/me.png',
        selectedIconPath: './assets/images/tab/me_active.png',
      },
    ],
  },
})
