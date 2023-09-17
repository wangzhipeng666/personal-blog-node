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
8. 使用koa-morgan写日志
```
npm i koa-morgan --save
```
9. koa2解决跨域
1.手动添加一个中间件
```            
app.use(async (ctx, next)=> {
    ctx.set("Access-Control-Allow-Origin",ctx.headers.origin)
    ctx.set("Access-Control-Allow-Credentials", true)
    ctx.set("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS")
    ctx.set("Access-Control-Allow-Headers", "Content-Type")
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});
```
2.使用koa2-cors
2.1先下载
npm install koa2-cors --save
2.2使用
```
const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();

app.use(cors());
//或者
app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*'; // 允许来自所有域名请求
            }
            return ctx.headers.origin; //只允许请求源地址这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);