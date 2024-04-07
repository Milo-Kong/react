import { isAndroid } from '@/Common'
import './index.less'
const HomePage = () => {
  const IsAndroid = isAndroid()
  const handleFull = () => {
    const json = {
        type: 'openChildPage',
        data: {
          url:"https://productpreview.intoverse.co/#/childpage",
          isFullScreen:true
        }
    }
   
    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(json))
  } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(json))
  }
  }

  const handleNot = () => {
    const notJson = {
      type: 'openChildPage',
      data: {
        url:"https://productpreview.intoverse.co/#/childpage",
        isFullScreen:false
      }
    }
    if (IsAndroid) {
      window._tw_?.callInto(JSON.stringify(notJson))
  } else {
      webkit.messageHandlers._tw_.postMessage(JSON.stringify(notJson))
  }
  }
  const handleColse=()=>{
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
  return (<> <div className='mainView'>
    <div className='full' onClick={handleFull}>
      子全屏
    </div>
    <div className='nofull' onClick={handleNot}>
      子退出全屏
    </div>
    <div className='close' onClick={handleColse}>
    关闭
    </div>
  </div>
  </>

  );
}
export default HomePage
