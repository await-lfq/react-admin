const express=require("express");
const app=express();
const allRouter=require("./routers"); // 主路由
app.use(express.static("./"));
app.use(allRouter);
app.listen(2021,()=>{
  console.log("服务器开启，端口为2021")
})
