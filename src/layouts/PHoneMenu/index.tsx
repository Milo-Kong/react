
import { useState } from 'react';
import './index.less'
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { history, setLocale, useLocation } from 'umi';
import { MenusInterface, allMenus } from '@/layouts/Header/dataSource';
import LocalsLanaugae from '@/locales';
import { animated, useSpring,  } from 'react-spring'

export default function PhoneMenu() {
  const { t, language } = useTranslationLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [willClose, setWillClose] = useState(false)

  function onOpen() {
    if (!open) {
      setOpen(true)
    } else {
      onClose()
    }
  }
  function onClose() {
    setWillClose(true)
    setTimeout(() => {
      setOpen(false)
      setWillClose(false)
    }, 250);
  }
  function onOpenModal() {
    onClose()
  }

  const menusList = allMenus
  return (
    <div className='column'>
      <img className='menuIcon' src={open ? '/svg/menuClose.svg' : '/svg/phoneMenu.svg'} onClick={onOpen} />
      {
        open && <div className={`column menuShowView animate__animated ${willClose ? 'animate__fadeOut' : 'animate__fadeIn'} animate__faster`}>
          {/* <div className='rowBetween mobileTopButtonView'>
            {location.pathname == '/' && <div className='rowCenter LaunhAppButton'>{t('LAUNCH')}</div>}
            <ConnectWallet openModal={onOpenModal} />
          </div> */}
          {
            menusList.map((item: MenusInterface, index: number) => {
              if (item.title == 'EARN') {
                return <Earn index={index} key={item.title} item={item} onSelect={onClose} />
              }
              if (item.title == 'AUDIT') {
                return <Audit index={index} key={item.title} item={item} onSelect={onClose} />
              }
              if (item.title == "NFT") {
                return <NFTPhone index={index} key={item.title} item={item} onSelect={onClose} />
              }
              return <OtherItem item={item} key={item.title} onClose={onClose} index={index} />
            })
          }
          {/* < LanguageItem index={menusList.length} /> */}
        </div>
      }
    </div >
  )
}
function LanguageItem({ index }: any) {
  const { t, language } = useTranslationLanguage()
  const [show, setShow] = useState(false)
  const spring = useSpring({
    from: { x: -300, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: index * 50,
    config: {
      mass: 2,
      tension: 100, friction: 18
    }
  })

  function onChooseLanguage(lan: string) {
    setLocale(lan, false)
    setShow(false)
  }

  return <div className='column' style={{ width: '100%' }}>
    <animated.div style={spring} className='rowBetween mobileMenuItem' onClick={() => {
      setShow(true)
    }}>
      <div className='mobileMenuTitle'>{LocalsLanaugae[language]?.title}</div>
    </animated.div>

    {
      show && <div className='column mobilelanguageShowView'>
        <div className='mobilelanguageBgShowView animate__animated animate__fadeIn animate__faster'></div>
        <div className='column mobilelanguageShowConView animate__animated animate__fadeInUp animate__faster'>
          <div className='rowBetween'>
            <div className='languageT'>{t('Language')}</div>
            <img className='languageClose' src='/svg/menuClose.svg' onClick={() => {
              setShow(false)
            }} />
          </div>
          {
            Object.keys(LocalsLanaugae).map((item: string, index: number) => {
              return <div className='rowBetween' key={'mobilelanguageItem_' + item} onClick={() => onChooseLanguage(item)}>
                <div className='mobilelanguageTitle'>
                  {LocalsLanaugae[item].title}
                </div>
                {language == item && <img className='languageSelectIcon' src='/svg/menuLanSel.svg' />}
              </div>
            })
          }
        </div>
      </div>
    }
  </div>
}
function OtherItem({ item, onClose, index }: any) {
  const location = useLocation()
  const spring = useSpring({
    from: { x: -300, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: index * 50,
    config: {
      mass: 2,
      tension: 100, friction: 18
    }
  })
  const { t, language } = useTranslationLanguage()
  return <animated.div className='rowBetween mobileMenuItem' onClick={() => {
    if (item.link.startsWith('http')) {
      window.open(item.link)
    } else {
      history.push(item.link)
    }
    onClose()
  }} style={spring}>
    <div className={`mobileMenuTitle ${location.pathname == item.link ? 'mobileMenuTitleSel' : ''}`}>{t(item.title)}</div>
  </animated.div>
}
function Earn({ item, onSelect, index }: any) {
  const { t, language } = useTranslationLanguage()
  const [show, setShow] = useState(false)
  const location = useLocation()

  const spring = useSpring({
    from: { x: -300, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: index * 50,
    config: {
      mass: 2,
      tension: 100, friction: 18
    }
  })
  return <animated.div style={spring} className='column'>
    <div className='rowBetween mobileMenuItem' key={item.title} onClick={() => {
      setShow(!show)
    }}>
      <div className={`mobileMenuTitle ${location.pathname.startsWith(item.link) ? 'mobileMenuTitleSel' : ''}`}>{t(item.title)}</div>
      <img className='mobileMenuIcon' src={show ? '/svg/menuArrowTop.svg' : '/svg/menuArrowDown.svg'} />
    </div>
    {
      show && <animated.div className='column' style={{ width: '100%' }}>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/earn/farm')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/earn/farm' ? 'mobileMenuTitleSel' : ''}`}>{t('Farm')}</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/earn/7pool')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/earn/7pool' ? 'mobileMenuTitleSel' : ''}`}>7 Pool</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/earn/assets')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/earn/asset' ? 'mobileMenuTitleSel' : ''}`}>{t('Asset')}</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/earn/community')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/earn/community' ? 'mobileMenuTitleSel' : ''}`}>{t('Community')}</div>
        </div>
      </animated.div>
    }
  </animated.div>
}
function Audit({ item, index }: any) {
  const { t, language } = useTranslationLanguage()
  const [show, setShow] = useState(false)
  const location = useLocation()

  const spring = useSpring({
    from: { x: -300, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: index * 50,
    config: {
      mass: 2,
      tension: 100, friction: 18
    }
  })
  return <animated.div style={spring} className='column'>
    <div className='rowBetween mobileMenuItem' key={item.title} onClick={() => {
      setShow(!show)
    }}>
      <div className={`mobileMenuTitle ${location.pathname.startsWith(item.link) ? 'mobileMenuTitleSel' : ''}`}>{t(item.title)}</div>
      <img className='mobileMenuIcon' src={show ? '/svg/menuArrowTop.svg' : '/svg/menuArrowDown.svg'} />
    </div>
    {
      show && <animated.div className='column' style={{ width: '100%' }}>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          window.open('https://hacken.io/audits/l7')
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle`}>Hacken</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          window.open('https://skynet.certik.com/zh-CN/projects/l7')
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle`}>Certik</div>
        </div>
      </animated.div>
    }
  </animated.div>
}


function NFTPhone({ item, onSelect, index }: any) {
  const { t, language } = useTranslationLanguage()
  const [show, setShow] = useState(false)
  const location = useLocation()

  const spring = useSpring({
    from: { x: -300, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: index * 50,
    config: {
      mass: 2,
      tension: 100, friction: 18
    }
  })
  return <animated.div style={spring} className='column'>
    <div className='rowBetween mobileMenuItem' key={item.title} onClick={() => {
      setShow(!show)
    }}>
      <div className={`mobileMenuTitle ${location.pathname.startsWith(item.link) ? 'mobileMenuTitleSel' : ''}`}>{t(item.title)}</div>
      <img className='mobileMenuIcon' src={show ? '/svg/menuArrowTop.svg' : '/svg/menuArrowDown.svg'} />
    </div>
    {
      show && <animated.div className='column' style={{ width: '100%' }}>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/nft')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/nft' ? 'mobileMenuTitleSel' : ''}`}>{t('NFT')}</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/nft/myAssets')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/nft/myAssets' ? 'mobileMenuTitleSel' : ''}`}>{t('Asset')}</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/nft/stake')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/nft/stake' ? 'mobileMenuTitleSel' : ''}`}>{t('STAKE')}</div>
        </div>
        <div className='rowBetween mobileMenuItem animate__animated animate__fadeInLeft animate__faster' onClick={() => {
          history.push('/nft/exchange')
          onSelect && onSelect()
        }}>
          <div className={`mobileMenuTitle mobileMenuSmallTitle ${location.pathname == '/nft/exchange' ? 'mobileMenuTitleSel' : ''}`}
          >{t('Swap')}</div>
        </div>
      </animated.div>
    }
  </animated.div>
}