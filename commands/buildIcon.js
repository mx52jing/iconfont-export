const path = require('path');
const fs = require('fs');
const fse = require('fs-extra')
const colors = require('colors')
const camelCase = require('lodash').camelCase
const upperFirst = require('lodash').upperFirst

// 获取配置信息
const getConfig = () => {
    const targetFilePath = path.resolve('iconfont.json'),
        config = require(targetFilePath),
        { save_dir, trim_icon_prefix } = config,
        fontDirPath = path.resolve(save_dir.slice(0, save_dir.lastIndexOf('/') + 1))
    return {
        fontDirPath,
        prefix: trim_icon_prefix
    }
}
// 获取所有组件名称
const getNames = str => {
    const reg = /case\s+['"]([0-9a-zA-Z-_]+)['"]:/g,
        names = new Set()
    str.replace(reg, (match, key) => {
        names.add(key)
    })
    return names
}

// 生成空格
const whitespace = repeat => {
    return ' '.repeat(repeat)
}
// 最终生成文件的模版
let template = `import React from 'react';
#imports#

const IconFont = ({ name, ...rest }) => {
    switch(name) {
    #cases#
    }
    return null
}

export const IconFontMaps = {
    #iconMaps#
}
export default IconFont
`
// 获取组件所有内容
const generateFileContent = () => {
    const { fontDirPath } = getConfig(),
        files = fs.readdirSync(fontDirPath),
        filterDirectories = files.filter(file => {
            const stat = fs.statSync(path.join(fontDirPath, file))
            return stat.isDirectory()
        }),
        allDirectoryLen = filterDirectories.length
    filterDirectories.forEach((item, index) => {
        const file = fs.readFileSync(path.join(fontDirPath, item, 'index.js'), { encoding: 'utf8' }),
            names = getNames(file)
        spliceContent(names, item, index, allDirectoryLen)
    })
}

// 拼接文件内容
const spliceContent = (names, pathName, index, allLen) => {
    const { prefix } = getConfig(),
        isLast = index === allLen - 1
    let imports = '',
        cases = '',
        iconMaps = ''
    for (const name of names) {
        const componentName = `Icon${upperFirst(camelCase(name))}`
        imports += `import ${componentName} from './${pathName}/${componentName}'\n`
        const iconName = name.toLowerCase().replace(prefix, '')
        cases += `${whitespace(8)}case '${iconName}':\n${whitespace(12)}return <${componentName} {...rest} />;\n`
        iconMaps += `${whitespace(4)}'${iconName}': ${componentName},\n`
    }
    for (const replaceKey of ['imports', 'cases', 'iconMaps']) {
        template = template.replace(
            new RegExp(`#${replaceKey}#`),
            isLast ? eval(replaceKey) : `${eval(`${replaceKey}\n`)}#${replaceKey}#`
        )
    }
}

!(async () => {
    try {
        await generateFileContent()
        const { fontDirPath } = getConfig(),
            writePath = path.join(fontDirPath, 'index.js')
        fse.outputFileSync(writePath, template)
        console.log(`${colors.green(`√`)} Generate export icon component file ${colors.green(`${writePath}`)}`)
    } catch (err) {
        console.log(colors.red(err))
    }
})()