/**
 * @description: 公共正则
 */
const regExpObj = {
  userName: /^[\u4e00-\u9fa5]+$/, // 姓名
  identityCard: /\d{15}(\d\d[0-9xX])?/, // 身份证
  telephone: /^1\d{10}$/, // 手机号
  mobile: /^\d{10,12}$/, // 固定电话 /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
  sixCode: /^\d{6}$/, // 6位短信验证码
  imageFile: /\/(?:jpeg|png|gif|jpg|bmp)/i // 图片文件 file.type
};

export {
  regExpObj
};
