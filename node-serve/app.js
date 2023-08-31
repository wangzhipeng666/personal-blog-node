const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');
    // 设置允许跨域的源
    res.setHeader("Access-Control-Allow-Origin","*");  
    // 设置cookie允许跨域
    res.setHeader("Access-Control-Allow-Credentials", true);  
    // 设置可以跨域的请求方法
    res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");

    // 处理跨域预检请求（OPTIONS 请求）
    // if (req.method === 'OPTIONS') {
    //     res.writeHead(200);
    //     res.end();
    //     return;
    // }
    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    // 处理路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
        blogResult.then(blogData => {
            res.end(
                JSON.stringify(blogData)
            )
        })
        return
    }

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
}

module.exports = serverHandle