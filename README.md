# 博客后台服务

## 基础创建
1. 安装nodemon启动node服务 
```
npm install nodemon --save-dev

2. 安装cross-env配置环境变量
```
npm install cross-env --save

3. 配置启动命令
```
"main": "bin/www.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
    "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"
},

4. 创建www.js配置服务
```
const http = require('http');

const PORT = 8000;
const serverHandle = require('../app');

const server = http.createServer(serverHandle);
server.listen(PORT);

5. 创建app.js编写代码
```

