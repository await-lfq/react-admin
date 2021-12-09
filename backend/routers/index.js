const express = require("express");
const userRouter = require("./user");  // 登录页面路由
const adminManager = require("./adminManager"); // 用户管理页面路由
const { verifyToken } = require("../utils/token"); 
const router = express.Router();
router.use("/user", userRouter); 
router.use("/adminManager", adminManager);
// 权限校验
router.use((req, res, next) => {
  if (req.originalUrl.startsWith('/user/login') || req.originalUrl.startsWith('/user/registry')) { // 登陆与注册接口，不需要做权限验证
    next()
  } else { // 其他接口，需要做权限验证
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split("Bearer ")[1];
      if (verifyToken(token)) {
        next()
      } else {
        res.send({
          msg: "请重新登陆",
          code: 99,
          data: ""
        })
      }
    } else {
      res.send({
        msg: "请登录",
        code: 99,
        data: ""
      })
    }
  }
})
module.exports = router;