import React, { Component } from 'react'

module.exports = function (options) {
  console.log(options)

  const handleLogin = () => {
  }

  const Component = () => (
    <button onClick={handleLogin} className="btn-home btn-home-normal" >LDAP + Mail登录</button>
  )

  this.bindHook('third_login', Component);
};
