# vite-plugin-html

基于vite插件开发规范进行开发，此插件目的是为了解决index.html在打包时，如果你的index.html需要配置服务端参数

例如存在  `<link rel="stylesheet" href="{{cdnHost}}/cdn/xxx.css" type="text/css">` 会出现如下错误！

```
Error: [vite]: Rollup failed to resolve import "{{cdnHost}}/cdn/xxx.css" from "index.html".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
```

根据提示配置`build.rollupOptions.external`打包后会被直接忽略掉，并不是我们想要的效果

## 安装
```
npm i andvx
```


## 使用

vite.config.js
```
import htmlPlugin from 'andvx/vitePlugin/vite-plugin-html'

export default defineConfig({
    ...
    plugins: [
        ..., 
        htmlPlugin({})
    ],
    ...
})
```

## 可配置参数

| 参数名 | 值类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| prefix | string | "base64::" | 解析前缀，修改此值时候需要注意末尾需要用特殊字符做为分割避免判断出错 |
| rules | array | ['<link ', '{{'] | 目前针对上述情况默认配置了这两个值用来查找到对应的会略行 |
