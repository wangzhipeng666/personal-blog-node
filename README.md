# 博客后台服务

## 基础创建
1. 安装nodemon启动node服务 
```
npm install nodemon --save-dev
```

2. 安装cross-env配置环境变量
```
npm install cross-env --save
```

3. 配置启动命令
```
"main": "bin/www.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
    "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"
},
```

4. 创建www.js配置服务
```
const http = require('http');

const PORT = 8000;
const serverHandle = require('../app');

const server = http.createServer(serverHandle);
server.listen(PORT);
```

5. 创建app.js编写代码
```
console.log('测试一下')
```

6. 安装并连接mysql
 - 本地安装mysql - https://www.runoob.com/mysql/mysql-install.html
 - 使用navicat创建数据库
 - 编写配置信息 - conf/db.js
 - 下载mysql - npm install mysql --save
 - node链接mysql - db/mysql.js

7. 处理请求url
```
const querystring = require('querystring');

// 设置返回格式 JSON
res.setHeader('Content-type', 'application/json');

// 获取 path
const url = req.url;
req.path = url.split('?')[0];

// 解析 query
req.query = querystring.parse(url.split('?')[1]);
```

8. 处理请求路由
```
const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        const result = getList(author, keyword)
        return result.then(listData => {
            console.log(listData);
        })
    }
}
```

9. 查询数据库
```
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

module.exports = { getList }
```

10. 其他
 - 使用navicat管理数据
 - 使用postman模拟接口请求

11. 接口返回数据统一处理
```
class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}
```

12. 配置跨域资源共享CORS
```
// 设置返回格式 JSON
res.setHeader('Content-type', 'application/json');
// 设置允许跨域的源
res.setHeader("Access-Control-Allow-Origin","*");  
// 设置cookie允许跨域
res.setHeader("Access-Control-Allow-Credentials", true);  
// 设置可以跨域的请求方法
res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");
```
13. 解决跨域问题
对于前端的复杂请求，需要对响应头进行配置以及处理跨域预检请求
```
// 设置允许跨域的响应头
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// 设置可以跨域的响应方法
res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

// 处理跨域预检请求（OPTIONS 请求）
if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
}
```
相关文章：https://cloud.tencent.com/developer/article/1964217
13. 处理 POST 请求中的请求体数据
问题：通过post发送请求在res.body获取不到数据
解决方法：
 - 编写请求体解析逻辑
 ```
 let postData = ''
    req.on('data', chunk => {
        postData += chunk.toString()
    })
    req.on('end', () => {
        if (!postData) {
            resolve({})
            return
        }
        resolve(JSON.parse(postData))
    })
 ```
 - 使用框架（express、koa）中间件
14. 后端解决cookie导致跨域问题
问题：前端携带cookie请求接口时，会导致跨域问题
解决：允许跨域的源不能为'*',设置cookie允许跨域
```
// 设置允许跨域的源
res.setHeader("Access-Control-Allow-Origin",req.headers.origin);
// 设置cookie允许跨域
res.setHeader("Access-Control-Allow-Credentials", true);
```
15. 后端操作cookie
- httpOnly可以进行限制，防止前端修改cookie信息
- expires设置过期时间
```
res.setHeader('Set-Cookie', `username=${username}; httpOnly; expires=${getCookieExpires()}`)
```
16. 使用session存储用户信息
问题：存储在cookie中信息会暴露，不安全
解决：cookie中存储userid,server端存储用户信息

17. 将session存入redis
- 安装配置redis
