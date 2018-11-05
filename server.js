const ldap = require('ldapjs')

module.exports = function (options) {
  const { server } = options
  let msg = {}

  this.bindHook('third_login', (ctx) => {
    const { email, password } = ctx.request.body

    return new Promise((resolve, reject) => {
      const client = ldap.createClient({
        url: server
      })

      client.once('error', err => {
        if (err) {
          msg = {
            type: false,
            message: `once: ${err}`
          }

          reject(msg)
        }
      })

      client.bind(email, password, err => {
        if (err) {
          msg = {
            type: false,
            message: `登录失败`,
          }
          reject(msg)
        } else {
          msg = {
            type: true,
            message: `登录成功`,
            email,
            password,
          }
          resolve(msg)
        }

        client.unbind()
      })
    })
  })
}
