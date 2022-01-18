import * as urls from "./urls";
import { get, post } from "./request";
/**
 * @description 注册接口
 * @method register
 * @param {object对象} 请求参数
 * @returns {Promise对象} Promise对象
 */
export function register (params = {}) {
  return post(urls.registry, params)
}