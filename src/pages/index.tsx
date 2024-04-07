import { isAndroid } from '@/Common'
import './index.less'
import {history} from 'umi'
const HomePage = () => {
  const IsAndroid = isAndroid()
  
  const handleFull = () => {
    const jsn = {
      type: 'fullScreen',
      data: true
    }

    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(jsn))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(jsn))
    }
  }

  const handleNot = () => {
    const jsn = {
      type: 'fullScreen',
      data: false
    }
    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(jsn))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(jsn))
    }
  }

  const handlesonFull = () => {
    const json = {
      type: 'openChildPage',
      data: {
        url: "https://productpreview.intoverse.co/#/childpage",
        isFullScreen: true
      }
    }

    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(json))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(json))
    }
  }

  const handlesonNot = () => {
    const notJson = {
      type: 'openChildPage',
      data: {
        url: "https://productpreview.intoverse.co/#/childpage",
        isFullScreen: false
      }
    }
    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(notJson))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(notJson))
    }
  }
  const handleColse = () => {
    const closeJson = {
      type: 'closePage',
      data: ''
    }
    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(closeJson))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(closeJson))
    }
  }

  const handlesonopenFull = () => {
    const json = {
      type: 'openChildPage',
      data: {
        url: "https://productpreview.intoverse.co/#/childpage?fullScreen=1",
        isFullScreen: true
      }
    }

    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(json))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(json))
    }
  }

  const handlesonopenNot = () => {
    const notJson = {
      type: 'openChildPage',
      data: {
        url: "https://productpreview.intoverse.co/#/childpage?fullScreen=2",
        isFullScreen: false
      }
    }
    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(notJson))
    } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(notJson))
    }
  }
  return (<> <div className='mainView'>
    <div className='full' onClick={handleFull}>
      全屏
    </div>
    <div className='nofull' onClick={handleNot}>
      退出全屏
    </div>

  
    <div className='close' onClick={handleColse}>
      关闭
    </div>
    <div className='close newbtn' onClick={()=>{
      history.push('/new')
    }}>
      打开新的页面
    </div>
  </div>
  </>

  );
}
export default HomePage
