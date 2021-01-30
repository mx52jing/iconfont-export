## iconfont-export

在项目中使用图标时,使用`react-iconfont-cli`很方便的将[iconfont](https://www.iconfont.cn/)选中的图标打包到项目下

使用`react-iconfont-cli`生成的项目结构
```
iconfont
    fontsA
        ...
        index.js
    fontsB
        ...
        index.js
```
`fontsA/index.js`中将该目录下的所有图标都导出了,但是`iconfont`目录没有统一导出所有图标的文件, 该工具就是读取`iconfont`目录下所有图标，生成统一导出文件,并添加到`iconfont`目录下，方便引入使用

使用`iconfont-export`之后生成的结构
```
iconfont
    fontsA
        ...
        index.js
    fontsB
        ...
        index.js
    index.js
```

## 安装
```bash
# Yarn
yarn add iconfont-export
# Npm
npm install iconfont-export
```

## 使用

### Step1
生成配置文件
```
npx font-init
```

此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
    "symbol_url": "请参考README.md，复制官网提供的JS链接",
    "use_typescript": false,
    "save_dir": "./src/components/iconfont",
    "trim_icon_prefix": "icon",
    "unit": "px",
    "default_icon_size": 18
}
```
### Step2
配置`iconfont.json`

详细配置以及说明戳[这里](https://www.npmjs.com/package/react-iconfont-cli)

### Step3
生成React标准组件并生成导出文件
```bash
npx font-export
```  

**最终导出文件格式**
```js
import React from "react"
import IconNameA from './A/IconNameA'
import IconNameB from './A/IconNameB'
...

export const IconFontMap = {
    'name': IconA,
    ...
}
const IconFont = ({ name, ...rest }) => {
    siwtch(name) {
        case 'name':
            return <IconName {...rest}>;
        ...
    }
    return null
}
export {
    IconA,
    IconB,
    ...
}
export default IconFont
```
