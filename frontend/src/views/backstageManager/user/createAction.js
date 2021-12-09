import { userList } from "../../../utils/urls";
import * as request from "../../../utils/request";
import { showToastWarn, showToastError } from "../../../utils/tool";
const action = {
  /**
   * @description 获取user列表数据
   * @method getUserListData
   * @param {Number,Number} 当前页 一页的数量
   */
  getUserListData (page = 1, limit = 5) {
    return async (dispatch) => {
      try {
        const res = await request.get(userList, { page, limit });
        if (res.data.code === 0) {
          dispatch({
            type: "GETUSERLISTDATA",
            data: res.data.data,
          })
        } else {
          showToastWarn(res.data.msg)
        }
      } catch (error) {
        showToastError("请求失败")
        throw error
      }
    }
  }
};
export default action;