import request from '@/utils/request'

export const loginByUsername = (account, password) => {
  return request.post('account/login', {
    account,
    password
  })
}

export const checkPwd = password => {
  return request.post('account/check', {
    password: password
  })
}

export const logout = () => {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

export const getUserInfo = token => {
  token = 'admin'
  return request({
    url: '/account/info',
    method: 'get',
    params: {
      token
    }
  })
}
