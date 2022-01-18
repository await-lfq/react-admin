const express = require("express");
const router = express.Router();
const query = require("../database/index") // 查询方法
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { createToken, verifyToken } = require("../utils/token"); // token验证与生成
// 注册接口
router.post("/registry", urlencodedParser, express.json(), async (req, res) => {
  try {
    const { phone, password } = req.body;
    const searchRes = await query(`select * from  registry where phone='${phone}'`); // 查表中是否有这条数据
    let data = null;
    if (searchRes.length) { // 用户存在
      data = {
        code: 1,
        msg: "该用户存在,注册失败"
      }
    } else { // 用户不存在
      let insertRes = await query(`INSERT INTO registry(phone,password) VALUES('${phone}','${password}')`); // 把该数据插入到表中
      if (insertRes.affectedRows) {
        data = {
          code: 0,
          msg: "注册成功"
        }
      }
    }
    res.send(data);
  } catch (error) {
    console.log(error);
  }
})
// 登陆接口
router.get("/login", async (req, res) => {
  let result = "";
  const { phone, password } = req.query;
  if (!phone || !password) {
    result = {
      msg: "传参错误",
      code: 1,
      data: {},
    };
    res.send(result);
    return;
  }
  let flag1 = false, flag2 = false;
  try {
    const sqlLogin = await query("SELECT * FROM login");
    for (let i = 0, len = sqlLogin.length; i < len; i++) {
      const item = sqlLogin[i];
      if (item.phone === phone) {
        flag1 = true;
        if (item.password === password) {
          flag2 = true;
          break;
        }
      }
    }
    if (flag1 && flag2) {
      result = {
        msg: "登录成功",
        code: 0,
        data: { token: createToken(password) },
      }
    } else if (flag1 && !flag2) {
      result = {
        msg: "密码输入错误",
        code: 1,
        data: {},
      }
    } else if (!flag1) {
      result = {
        msg: "该用户不存在",
        code: 1,
        data: {},
      }
    }
    res.send(result)
  } catch (error) {
    console.log(error);
  }
});

// 用户信息接口
router.get("/userInfo", (req, res) => {
  res.send({
    data: "",
    msg: "success",
    code: 0,
  })
})
module.exports = router;