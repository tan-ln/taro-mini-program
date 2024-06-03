
import { createApp } from 'vue'
import Taro from '@tarojs/taro'
import { setGlobalData } from './utils/globalData'
import './app.less'

const App = createApp({
  onShow (options) {
    console.log('App onShow.')

    let systemInfo = Taro.getSystemInfoSync();
    //计算页面底部的安全距离
    if (systemInfo.safeArea?.bottom) {
      const safeBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
      setGlobalData('safeBottom', safeBottom)
    } else {
      setGlobalData('safeBottom', systemInfo.screenHeight)
    }
    // 右上角胶囊按钮信息
    const MenuButtonInfo = Taro.getMenuButtonBoundingClientRect()
    setGlobalData('statusHeight', MenuButtonInfo.top)
    setGlobalData('navHeight', MenuButtonInfo.height)
    setGlobalData('menuButtonInfo', MenuButtonInfo)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

export default App
