const ldap = require('ldapjs')

module.exports = function (options) {
  const { server, allowed_domains } = options
  let msg = {}

  this.bindHook('third_login', (ctx) => {
    const { email, password } = ctx.request.body

    return new Promise((resolve, reject) => {
      if (allowed_domains) {
        const domain = email.split('@')[1]
        const allowed = allowed_domains.replace('，', ',').split(',').map(item => item.trim())
        if (!allowed.find(item => item === domain)) {
          msg = {
            type: false,
            message: '域名不在白名单内',
          }
          return reject(msg)
        }
      }

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
            username: email.split('@')[0],
          }
          resolve(msg)
        }

        client.unbind()
      })
    })
  })
}
