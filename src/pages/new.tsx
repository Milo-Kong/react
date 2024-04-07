import React, { useEffect } from "react";
import './new.less'
const NewView = () => {
    useEffect(() => {
        // 设置背景颜色为红色
        document.documentElement.style.backgroundColor = 'red';
        document.body.style.backgroundColor = 'red';
        // @ts-ignore
        document.getElementById('root').style.backgroundColor = 'red';
    
        // 清除背景颜色，防止影响其他页面
        return () => {
          document.documentElement.style.backgroundColor = '';
          document.body.style.backgroundColor = '';
        // @ts-ignore

          document.getElementById('root').style.backgroundColor = '';
        };
      }, []); 
    return <div className="newView">
        新的页面
    </div>
}
export default NewView