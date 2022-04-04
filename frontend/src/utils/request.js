import axios from "axios";
// axios进行二次封装
let server = axios.create({
  baseURL: "/lfq",
  timeout: 90000,
  withCredentials: false,
  responseType: "json",
  headers: { "Content-Type": "application/json;charset=utf-8" }
})
// 请求拦截器
server.interceptors.request.use(
  config => {
    if (localStorage.getItem("userInfo")) {
      config.headers.Authorization = "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token
    }
    return config
  },
  error => Promise.reject(error)

)
// 响应拦截器
server.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error)
);

/**
 * @description get请求
 * @method get
 * @return {Promise对象} Promise对象
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    server.get(url, {
      params: {
        ...params
      }
    }).then(res => resolve(res), error => reject(error))
  })
}
/**
 * @description post请求
 * @method post
 * @return {Promise对象} Promise对象
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    server.post(url, params).then(res => resolve(res), error => reject(error))
  })
}