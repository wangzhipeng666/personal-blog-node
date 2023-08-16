const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');

const serverHandle = (req, res) => {
    console.log(req.url);
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    // 处理路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
        blogResult.then(blogData => {
            console.log(JSON.stringify(blogData))
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