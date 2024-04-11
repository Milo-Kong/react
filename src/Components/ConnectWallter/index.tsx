import './index.less'
import { formatAccount } from '@/Common';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export default function ConnectWallet({ openModal }: any) {
  const { open, close } = useWeb3Modal()
  const { t } = useTranslationLanguage()
  const { address } = useAccount()
  function onConnect() {
    open && open()
    openModal && openModal()
  }
  return <div className={`rowCenter walletView`} onClick={onConnect}>
    <span className='address'>{address ? formatAccount(address) : t('Connect wallet')}</span>
  </div>
}