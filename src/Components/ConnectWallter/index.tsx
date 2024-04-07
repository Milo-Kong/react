import './index.less'
import { formatAccount } from '@/Common';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
export default function ConnectWallet() {
  const { open, close } = useWeb3Modal()
  const { address } = useAccount()
  function onConnect() {
    open && open()
  }
  const { t } = useTranslationLanguage()
  return <div onClick={onConnect} className='wallectIcon'>
    <img src={address ? '/svg/connect_icon.svg' : '/svg/no_connect.svg'} alt="" className='connect_icon' />
    <span className='wallect_address'>  {address ? formatAccount(address) : t('connect wallet')} </span>
  </div>
}