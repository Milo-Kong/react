import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/locale'
  ],
  routes: [
    { path: "/", component: "index" },

  ],
  npmClient: 'yarn',
  title:"",
  jsMinifierOptions: {
    target: ['chrome80', 'es2020']
  },
  clientLoader: {},
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
    useLocalStorage: true,
    baseNavigator: false,
    title:false
  },
  chainWebpack(config:any) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
  hash:true,
  history:{
    type:'hash'
  },
  metas:[
    {
      "http-equiv":'Cache-Control',
      content:'no-cache, no-store, must-revalidate'
    },
    {
      "http-equiv":"Pragma",
      content:'no-cache'
    },
    {
      "http-equiv":"Expires",
      content:"0"
    }
  ]
});
