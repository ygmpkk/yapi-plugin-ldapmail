# yapi-plugin-ldapmail

企业邮箱LDAP登录插件，配置方法如下：   

第一步： 在生成的配置文件config.json中加入如下配置：  

```
"plugins": [
    {
      "name": "ldapmail",
      "options": {
        "server": "ldaps:/LDAP",
        "allowed_domains": "foo.com, bar.com",
        "hide_login": true
      }
    }
  ]
```   
这里面的配置项含义如下：

- `server` LDAP服务端

第二步：在config.json 这层目录下运行 ```yapi plugin --name yapi-plugin-ldapmail```   重新下载插件  

第三步： 重启服务器
