# 博客后台服务

## 基础创建
1. 全局安装koa-generator用于安装koa项目
```
npm install koa-generator -g
```
2. 生成koa项目
```
koa2 blog-koa2
```
3. 安装插件
```
npm install nodemon cross-env --save-dev
```
4. 配置命令
```
"scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www",
    "prd": "cross-env NODE_ENV=production nodemon ./bin/www"
},
```
5. 安装插件
```
npm install mysql xss --save
```
6. koa处理session
```
npm i koa-generic-session --save
```
7. 使用redis存储session
```
npm i redis koa-redis --save
```
redis版本过高会导致连接不上服务