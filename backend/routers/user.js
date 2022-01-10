let express = require("express");
let router = express.Router();
let query = require("../database/index") 
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const { createToken, verifyToken } = require("../utils/token");
// 注册接口
router.post("/registry", urlencodedParser, express.json(), async (req, res) => {
  let { phone, password } = req.body;
  let searchSql = "SELECT * FROM registry";
  try {
    let searchData = await query(searchSql);
    let flag = searchData.some((item) => item.phone === phone);
    let result;
    if (flag) { // 用户存在
      result = {
        code: 1,
        msg: "该用户存在，注册失败"
      }
    } else { // 用户不存在
      let insertSql = `INSERT INTO registry(phone,password) VALUES('${phone}','${password}')`;
      try {
        let insertData = await query(insertSql);
        if (insertData.affectedRows) {
          result = {
            code: 0,
            msg: "注册成功"
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    res.send(result)
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
router.get("/userInfo",(req,res)=>{
  res.send({
    data:"",
    msg:"success", 
    code:0,
  })
})
module.exports = router;