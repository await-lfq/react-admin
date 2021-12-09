const express=require("express");
const allRouter=require("./routers"); // 主路由
const app=express();
app.use(express.static("./"));
app.use(allRouter);
app.listen(2021,()=>{
  console.log("服务器开启，端口为2021")
})
