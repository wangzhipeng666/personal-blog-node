const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return await exec(sql)
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    // 使用xss插件防止xss攻击
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, author, createTime)
        values ('${title}', '${content}', '${author}', '${createTime}');
    `

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`

    const rows = await exec(sql)
    return rows[0]
}

const updateBlog = async (id, blogData = {}) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = { getList, newBlog, getDetail, updateBlog, delBlog }