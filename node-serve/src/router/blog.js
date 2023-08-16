const { getList } = require('../controller/blog');

const handleBlogRouter = (req, res) => {
    const method = req.method
    console.log(method)
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

module.exports = handleBlogRouter;