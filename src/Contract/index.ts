import { RefreshConfig, getContractErrorMsg } from '@/Common';
import { useQuery, useMutation } from '@tanstack/react-query'
import { ContractInterface, IntoEaster_CONTRACT, TEST_CONTRACT, ZNBPleiadePlan_CONTRACT } from '@/Contract/addresses';
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { TransLoadingConfirm, TransLoadingError, TransLoadingPending, TransLoadingSuccess } from '@/Components/TransactionLoading';
import { publicClient } from '@/provider/Web3ModalProvider';
import TestContact_ABI from '@/ABI/TestContact.json'
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { getRequest, getRequestCustom, postRequest } from '@/API';
import { API_USER_ATTR, API_USER_CODE, API_USER_TIME } from '@/API/API';
import { useXIntoToken } from '@/Redux/setting';

interface Transaction {
  title: string,
  contract: ContractInterface,
  funcName: string,
  args: any[],
  value?: any,
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function,
}

export function useSendTransaction() {
  const chainID = useChainId()
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const successFun = useRef<any>()
  const errorFun = useRef<any>()
  const canShowLoading = useRef<boolean>(true)

  const { writeContract, data: hash, error, isError } = useWriteContract()
  const { isLoading, isSuccess, isError: waitIsError, error: waitError } = useWaitForTransactionReceipt({
    hash
  })
  useEffect(() => {
    if (isError && canShowLoading.current) {
      TransLoadingError(getContractErrorMsg(error), '', chainID)
      errorFun.current && errorFun.current(error)
      console.log('error===', error)

      canShowLoading.current = false
    }
  }, [isError])

  useEffect(() => {
    if (waitIsError && canShowLoading.current) {
      TransLoadingError(getContractErrorMsg(waitError), hash || '', chainID)
      errorFun.current && errorFun.current(waitError)
      console.log('waitError===', waitError, hash)

      canShowLoading.current = false
    }
  }, [waitIsError])

  useEffect(() => {
    if (isLoading) {
      TransLoadingPending(hash || '', chainID)
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess && canShowLoading.current) {
      TransLoadingSuccess(hash || '', chainID)
      successFun.current && successFun.current(hash)
      console.log('isSuccess===', hash)

      canShowLoading.current = false
    }
  }, [isSuccess])

  function sendTransaction(params: Transaction) {
    successFun.current = params.onSuccess
    errorFun.current = params.onError
    return new Promise(() => {
      if (!address) {
        open && open()
        return
      }
      TransLoadingConfirm(params.title)
      const transParams = {
        abi: params.contract.abi,
        address: params.contract.addresses[chainID],
        args: params.args,
        functionName: params.funcName
      }
      console.log('transParams', transParams)
      canShowLoading.current = true
      writeContract(transParams)
    })
  }

  return useMutation({
    mutationFn: (params: Transaction) => sendTransaction(params)
  })
}


export function useMutilCallTest() {
  const { address } = useAccount()
  const chainId = useChainId()
  async function fetchData() {
    if (!address || !chainId) {
      return
    }
    const begin = dayjs().valueOf()

    const abc = await publicClient.multicall({
      contracts: [
        {
          address: TEST_CONTRACT.addresses[chainId],
          abi: TestContact_ABI,
          functionName: 'dayID',
          args: []
        },
        {
          address: TEST_CONTRACT.addresses[chainId],
          abi: TestContact_ABI,
          functionName: 'balance',
          args: [address]
        },
        {
          address: TEST_CONTRACT.addresses[chainId],
          abi: TestContact_ABI,
          functionName: 'income',
          args: [address]
        },
        {
          address: TEST_CONTRACT.addresses[chainId],
          abi: TestContact_ABI,
          functionName: 'getAPrice',
          args: []
        },
      ]
    })
    const end = dayjs().valueOf()
    console.log('mutilcall 耗时', (end - begin) / 1000, '秒')



    return {
    }
  }
  return useQuery({
    queryKey: ["useMutilCallTest"],
    queryFn: fetchData,
    enabled: !!chainId && !!address,
    refetchInterval: RefreshConfig.shortRefreshInterval
  })
}


export function useTest() {
  const { address } = useAccount()
  const chainId = useChainId()

  async function fetchData() {
    if (!address || !chainId) {
      return
    }
    const getPledgeDetail = await publicClient.readContract({
      address: ZNBPleiadePlan_CONTRACT.addresses[chainId],
      abi: ZNBPleiadePlan_CONTRACT.abi,
      functionName: 'getPledgeDetail',
      args: [address, 'FTC']
    })
    console.log('getPledgeDetail==', getPledgeDetail)
    return { getPledgeDetail }
  }
  return useQuery({
    queryKey: ["useTest"],
    queryFn: fetchData,
    enabled: !!chainId && !!address,
    refetchInterval: RefreshConfig.shortRefreshInterval
  })
}


