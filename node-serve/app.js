const querystring = require('querystring');

const serverHandle = (req, res) => {
    console.log(req.url);
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);
}

module.exports = serverHandle