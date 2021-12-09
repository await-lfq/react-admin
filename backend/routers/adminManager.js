const express = require("express");
const router = express.Router();
const query = require("../database/index");
// 用户信息列表接口
router.get("/userList", async (req, res) => {
  const { page, limit } = req.query;
  try {
    let result;
    const userInfo = await query(`SELECT * FROM userInfo LIMIT ${limit * page - limit},${limit}`);
    const AllUserInfo = await query("SELECT * FROM userInfo");
    console.log(AllUserInfo.length, "AllUserInfo");
    if (userInfo.length >= 0) {
      result = {
        msg: "success",
        code: 0,
        data: {
          total: AllUserInfo.length,
          userInfoList:userInfo
        }
      }
    } else {
      result = {
        msg: "获取数据失败",
        code: 1,
      }
    }
    res.send(result);
  } catch (error) {
    console.log(userInfo);
  }

});
module.exports = router;