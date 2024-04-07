import { createWeb3Modal } from '@web3modal/wagmi/react'
import { createPublicClient, http } from 'viem'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { MATCHTEST_Chain, MATCH_Chain } from '@/Contract/chains'
const projectId = '5bad4b7459c1bdcb4d4972a1227b03c2'
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
const chains = [MATCH_Chain] as const
const wagmiConfig = defaultWagmiConfig({
  // chains, // required
  chains:chains,
  projectId, // required
  metadata, // required
})
export const publicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain:MATCH_Chain,
  transport:http()
})
 
const featuredWalletIds: any = [
  "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",// bitget
  "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",// okx
  "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",// tp
  // "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"//metamask
]
createWeb3Modal({
  wagmiConfig,
  projectId,
  // customWallets,
  featuredWalletIds:featuredWalletIds,
})
export default function Web3ModalProvider({ children }:any){
  return <WagmiProvider config={wagmiConfig}>
    {children}
  </WagmiProvider>
}