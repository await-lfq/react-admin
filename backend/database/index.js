let mysql = require("mysql");
// 创建连接池
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "react_admin",
  multipleStatements: true,
});
/**
 * @description 查询方法
 * @method query
 * @return {Promise对象} Promise对象
 */
function query (sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      }
    })
  })
};
module.exports = query;