import { message } from 'antd';
/**
 * @description 消息成功的反馈
 * @method showToastSuccess
 */
export function showToastSuccess (info) {
  message.success(info);
}
/**
 * @description 消息警告的反馈
 * @method showToastWarn
 */
export function showToastWarn (info) {
  message.warn(info)
}
/**
 * @description 消息错误的反馈
 * @method showToastError
 */
export function showToastError (info) {
  message.error(info)
}
