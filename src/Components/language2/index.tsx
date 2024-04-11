import './index.less'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getLocale, setLocale } from 'umi';
import LocalsLanaugae from '@/locales';

const Language = React.memo(()=>{
  const [open,setOpen] = useState(false)
  const language = getLocale()

  function onChooseLanguage(lan:string){
    setLocale(lan,false)
    setOpen(!open)
  }
  // {LocalsLanaugae[language] && LocalsLanaugae[language].title}

  function onMouseEnter(){
    setOpen(true)
  }
  function onMouseLeave(){
    setOpen(false)
  }
  return <div className='row languageView'  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}>
    <img
      className='languageIcon'
      src= {open ? '/svg/language_h.svg' : '/svg/language.svg'}
     
    />
    {open && <div
      className='languageShowView'>
      {
        Object.keys(LocalsLanaugae).map((item:string,index:number)=>{
          return <div
            key={'languageItem_' + item}
            className='languageShowItemView'
            onClick={()=>onChooseLanguage(item)}
            
          >
            {LocalsLanaugae[item].title}
          </div>
        })
      }
    </div>}
  </div>
},(pre:any,nex:any)=>true)
export default Language