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
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www",
    "prd": "cross-env NODE_ENV=production nodemon ./bin/www"
},
```
5. 安装插件
```
npm install mysql xss --save
```
6. express处理session
```
npm i express-session --save
```
7. 使用redis存储session
```
npm i redis connect-redis --save
```
8. 登录中间件

9. 配置路由

10. 使用morgan写日志
https://github.com/expressjs/morgan

11. express解决跨域
- 安装cors
```
npm install cors --save-dev

const cors = require('cors');
app.use(cors());
```
- 手动实现
```
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",req.headers.origin)
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    next();
});
```