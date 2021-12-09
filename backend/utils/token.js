const jsonwebtoken = require("jsonwebtoken");
const secret = "lfq"  // 密钥
/**
 * @description 生成token
 * @method createToken
 * @param {string,number} 密码 有效时间(精确到秒)
 * @return {string} token
 */
function createToken (data, expiresIn = 3 * 24 * 60 * 60) {
  const token = jsonwebtoken.sign({ data }, secret, { expiresIn });
  return token;
}
/**
 * @description 校验token
 * @method verifyToken
 * @param {string} token
 * @return {boolean} 是否验证成功
 * 
 */
function verifyToken (token) {
  try {
    jsonwebtoken.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}
exports.createToken = createToken;
exports.verifyToken = verifyToken;
