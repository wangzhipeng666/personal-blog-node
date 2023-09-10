const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()

}

// 用于处理post数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
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
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');
    // 设置允许跨域的源
    res.setHeader("Access-Control-Allow-Origin",req.headers.origin);
    // 设置cookie允许跨域
    res.setHeader("Access-Control-Allow-Credentials", true);
    // 设置可以跨域的请求方法
    res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");
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
    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    // 解析 cookie
    console.log(req.headers.cookie, 'cookie')
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    const username = req.cookie.username

    getPostData(req).then(postData => {
        req.body = postData
        // 处理路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.setHeader('Set-Cookie', `username=${username}; httpOnly; expires=${getCookieExpires()}`)
                res.end(
                    JSON.stringify(blogData)
                )
                // res.statusCode = 500;
                // res.end('服务器内部错误');
            })
            return
        }

        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.setHeader('Set-Cookie', `username=${username}; httpOnly; expires=${getCookieExpires()}`)
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中路由，返回 404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle