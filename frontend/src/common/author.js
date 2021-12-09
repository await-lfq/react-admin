
/**
 * @description 获取登陆信息
 * @method getLoginInfo
 * @return {Object对象} 登陆信息
 */
export function getLoginInfo() {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  }
  return {};
}
/**
 * @description 退出登陆
 * @method logout
 */
export function logout() {
  localStorage.clear();
}