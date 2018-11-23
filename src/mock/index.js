import Mock from 'mockjs'
import loginAPI from './auth'
import homeApi from './home'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/account\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/account\/check/, 'post', loginAPI.check)
Mock.mock(/\/account\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/account\/info\.*/, 'get', loginAPI.getUserInfo)

Mock.mock(/\/api\/home/, 'get', homeApi.homedata)

export default Mock
