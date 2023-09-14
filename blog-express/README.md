# express框架重构

## 项目搭建
1. 全局安装express-generator用于安装express项目
```
npm install express-generator -g
```
2. 生成express项目
```
express blog-express
```
3. 安装插件
```
npm install nodemon cross-env --save-dev
```
4. 配置命令
```
"scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www"
},
```