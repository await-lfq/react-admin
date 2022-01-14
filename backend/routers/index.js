const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/token");  // token验证
const userRouter = require("./user");  // 登录接口路由
const adminManager = require("./adminManager"); // 用户管理接口路由
router.use("/user", userRouter);
router.use("/adminManager", adminManager);
// 权限校验
const pathList = ["/user/login", "/user/registry"]; // 不需要权限校验的接口
router.use((req, res, next) => {
  if (pathList.some(item => req.originalUrl.startsWith(item))) { // 不需要做权限校验的接口
    next()
  } else { // 需要做权限验证
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split("Bearer ")[1];
      if (verifyToken(token)) {
        next();
        return;
      }
      res.send({
        msg: "请重新登陆",
        code: 99,
        data: ""
      })
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