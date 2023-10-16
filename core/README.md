# `simple-portal`

挂载节点

## 案例

```tsx mdx:preview
import React from "react"
import { openSimplePortal } from "@carefrees/simple-portal"

const Demo = () => {

  const onClick = ()=>{
    openSimplePortal({
      children:<div>展示哈哈哈哈</div>,
      isOnly:false,
      timeout:3000,
        /**根节点id*/
      // rootId?: string;
      // children: React.ReactNode;
      // /**是否只把展示内容进行替换，不显示多个弹框之类的*/
      // isOnly?: boolean;
      // /**自动移除dom时间*/
      // timeout?: number;
      // /**根节点className*/
      // rootClassName?: string
      // /**节点className*/
      // className?: string;
      // /**根节点样式*/
      // rootStyles?: string
      // /**节点样式*/
      // style?: string
    })
  }

  return (<button onClick={onClick} >点击</button>)
}

export default Demo

```
