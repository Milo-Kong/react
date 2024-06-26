import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const slippageDefault:string = '1.0'
export const deadlineDefault:string = '20'
export const themeDefault:string = 'light'
export const xIntoToken:string = ''
const initialState:any = {
  slippage:slippageDefault,
  deadlineTime:deadlineDefault,
  theme:themeDefault,
  xIntoToken
}

export function useSlippage(): string {
  return useSelector((state: RootState) => state.setting.slippage)
}
export function useDeadline(): string {
  return useSelector((state: RootState) => state.setting.deadlineTime)
}
export function useTheme(): string {
  return useSelector((state: RootState) => state.setting.theme)
}
export function useXIntoToken(): string {
  return useSelector((state: RootState) => state.setting.xIntoToken)
}
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeSlippage:(state,action:PayloadAction<string>)=>{
      state.slippage = action.payload
    },
    changeDeadline:(state,action:PayloadAction<string>)=>{
      state.deadlineTime = action.payload
    },
    changeThem:(state,action:PayloadAction<string>)=>{
      state.theme = action.payload
    },
    changeXIntoToken:(state,action:PayloadAction<string>)=>{
      state.xIntoToken = action.payload
    }
  }
})

export const { changeSlippage, changeDeadline, changeThem ,changeXIntoToken} = settingSlice.actions
export default settingSlice.reducer

