const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body

        const result = login(username, password)
        return result.then(data => {
            console.log(data, '111')
            if (data.username) {
                return new SuccessModel()
            }
            return new ErrorModel('用户名或密码错误')
        })
    }
}

module.exports = handleUserRouter