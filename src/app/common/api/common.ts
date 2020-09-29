/**
 * @description: 公共接口
 */
export default {
  // 获取验证码
  getCode: {
    url: '/test/user/captcha',
    method: 'get'
  },

  // 获取用户信息
  userInfo: {
    url: '/test/user',
    method: 'get'
  }
};
