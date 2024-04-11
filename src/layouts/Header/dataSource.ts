
export interface MenusInterface {
    title:string,
    link:string,
    able:boolean
  }
  
  export const allMenus:MenusInterface[] = [
    {
      title:'HOME',
      link:'/',
      able:true
    },
    {
      title:'EARN',
      link:'/earn',
      able:false
    },
    {
      title:'CRYPTO CARD',
      link:'/cryptoCard',
      able:true
    },
    {
      title:'NFT',
      link:'/nft',
      able:false
    },
    // {
    //   title:'MY ASSETS',
    //   link:'/myAssets',
    //   able:true
    // },
    // {
    //   title:'STAKE',
    //   link:'/stake',
    //   able:true
    // },
    // {
    //   title:'EXCHANGE',
    //   link:'/exchange',
    //   able:true
    // },
    {
      title:'ANNOUNCEMENT',
      link:'/announcement',
      able:true
    },
    {
      title:'SUPPORT',
      link:'/support',
      able:true
    },
  ]