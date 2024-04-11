import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import './index.less'
import { history, setLocale, useLocation } from 'umi';
import PhoneMenu from '../PHoneMenu';
import { MenusInterface, allMenus } from './dataSource';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import LocalsLanaugae from '@/locales';
import Language from '@/Components/language2';
import ConnectWallet from '@/Components/ConnectWallter';
export default function Header() {
  const { t } = useTranslationLanguage()
  const location = useLocation()
  return (
    <div className='row header'>
      <div className='rowBetween headerContent'>
        <img className='logo' src='/svg/logo.svg' onClick={() => history.push('/')} />
        <div className='webView'>
          <div className='row'>
            <Menu />
            {/* {location.pathname == '/' && <div className='rowCenter launchApp' onClick={() => {
              history.push('/earn/farm')
            }}>{t('LAUNCH')}</div>} */}
            <ConnectWallet />
            <Language />
          </div>
        </div>
        <div className='mobileView rowEnd' style={{ flexDirection: 'row' }}>
          <ConnectWallet />

          <MobileLanguage />
          <PhoneMenu />
        </div>
      </div>
    </div>
  )
}
function Menu() {
  const { t } = useTranslationLanguage()
  const location = useLocation()
  const menusList = allMenus
  return <div className='row menuView' style={{ gridTemplateColumns: `repeat(${menusList.length}, auto)` }}>
    {
      menusList.map((item: MenusInterface) => {
        if (item.title == 'EARN') {
          return <EarnWeb item={item} key={item.title} />
        }
        if (item.title == 'AUDIT') {
          return <AuditWeb item={item} key={item.title} />
        }
        if (item.title == "NFT") {
          return <NFTWeb item={item} key={item.title} />
        }
        return <div key={item.title} className='rowCenter' style={{ height: '100%' }}>
          <div className={location.pathname == item.link ? 'menuTitle menuTitleSelect' : 'menuTitle'} onClick={() => {
            if (item.able) {
              if (item.link.startsWith('http')) {
                window.open(item.link)
              } else {
                history.push(item.link)
              }
            } else {
              toast.warn('coming soon~')
            }
          }}>{t(item.title)}</div>
        </div>
      })
    }
  </div>
}
function EarnWeb({ item }: any) {
  const { t } = useTranslationLanguage()
  const location = useLocation()
  const [show, setShow] = useState(false)
  function onMouseEnter() {
    setShow(true)
  }

  function onMouseLeave() {
    setShow(false)
  }
  return <div className='row' style={{ height: '100%' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className={location.pathname.startsWith(item.link) ? 'menuTitle menuTitleSelect' : 'menuTitle'}>{t(item.title)}</div>
    {
      show && <div className='columnCenter earnShowView'>
        <div className='earnShowLineView' />
        <div className={`row earnShowItemView ${location.pathname == '/earn/farm' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/earn/farm')
          setShow(false)
        }}>{t('Farm')}</div>
        <div className={`row earnShowItemView ${location.pathname == '/earn/7pool' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/earn/7pool')
          setShow(false)
        }}>7 POOL</div>
        <div className={`row earnShowItemView ${location.pathname == '/earn/asset' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/earn/assets')
          setShow(false)
        }}>{t('Asset')}</div>
        <div className={`row earnShowItemView ${location.pathname == '/earn/community' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/earn/community')
          setShow(false)
        }}>{t('Community')}</div>
      </div>
    }
  </div>
}
function AuditWeb({ item }: any) {
  const { t } = useTranslationLanguage()
  const location = useLocation()
  const [show, setShow] = useState(false)
  function onMouseEnter() {
    setShow(true)
  }

  function onMouseLeave() {
    setShow(false)
  }
  return <div className='row' style={{ height: '100%' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className={location.pathname.startsWith(item.link) ? 'menuTitle menuTitleSelect' : 'menuTitle'}>{t(item.title)}</div>
    {
      show && <div className='columnCenter earnShowView'>
        <div className='earnShowLineView' />
        <div className={`row earnShowItemView ${location.pathname == '/earn/farm' && 'earnShowItemViewSel'}`} onClick={() => {
          window.open('https://hacken.io/audits/l7')
          setShow(false)
        }}>HACKEN </div>
        <div className={`row earnShowItemView ${location.pathname == '/earn/7pool' && 'earnShowItemViewSel'}`} onClick={() => {
          window.open('https://skynet.certik.com/zh-CN/projects/l7')
          setShow(false)
        }}>CERTIK</div>
      </div>
    }
  </div>
}

function MobileLanguage() {
  const [open, setOpen] = useState(false)
  function onChooseLanguage(lan: string) {
    setLocale(lan, false)
    setOpen(!open)
  }
  const { language } = useTranslationLanguage()
  let lan = language.split('-')[1]
  if (lan === 'US') {
    lan = 'EN'
  }
  return (
    <>
      <div className='language_m' onClick={() => {
        setOpen(!open)
      }}>{lan}</div>
      <motion.div
        className="language_list_m"
        initial={{ height: 0, opacity: 0, display: 'none' }}
        animate={open ? { height: '50%', opacity: 1, display: 'block' } : {}}

      // onMouseLeave={() => setOpen(false)}
      >

        {
          Object.keys(LocalsLanaugae).map((item: string, index: number) => {
            return <div
              key={'languageItem_' + item}
              onClick={() => onChooseLanguage(item)}
              className='lan_item'
              onTouchStart={(e: any) => e.target.style.color = '#F37021'}
              onTouchEnd={(e: any) => e.target.style.color = '#fff'}
            >
              {LocalsLanaugae[item].title}
            </div>
          })
        }
      </motion.div>

    </>

  )
}


function NFTWeb({ item }: any) {
  const { t } = useTranslationLanguage()
  const location = useLocation()
  const [show, setShow] = useState(false)
  function onMouseEnter() {
    setShow(true)
  }

  function onMouseLeave() {
    setShow(false)
  }
  return <div className='row' style={{ height: '100%' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className={location.pathname.startsWith(item.link) ? 'menuTitle menuTitleSelect' : 'menuTitle'}>{t(item.title)}</div>
    {
      show && <div className='columnCenter earnShowView'>
        <div className='earnShowLineView' />
        <div className={`row earnShowItemView ${location.pathname == '/nft' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/nft')
          setShow(false)
        }}>{t('NFT')}</div>
        <div className={`row earnShowItemView ${location.pathname == '/nft/myAssets' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/nft/myAssets')
          setShow(false)
        }}>{t('Asset')}</div>
        <div className={`row earnShowItemView ${location.pathname == '/nft/stake' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/nft/stake')
          setShow(false)
        }}>{t('STAKE')}</div>
        <div className={`row earnShowItemView ${location.pathname == '/nft/exchange' && 'earnShowItemViewSel'}`} onClick={() => {
          history.push('/nft/exchange')
          setShow(false)
        }}>{t('Swap')}</div>
      </div>
    }
  </div>
}