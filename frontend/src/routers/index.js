import { lazy } from "react";
// 主路由
const parentRouter = [
  {
    path: "/login",
    component: lazy(() => import("../views/login")),
    exact: true,
  },
  {
    path: "/register",
    component: lazy(() => import("../views/register")),
    exact: true,
  },
]
// 子路由
const sonRouter = [
  {
    path: "/home/index",
    component: lazy(() => import("../views/homeIndex")),
    exact: true,
  },
  {
    path: "/home/user",
    component: lazy(() => import("../views/backstageManager/user")),
    exact: true,
  },
  {
    path: "/home/role",
    component: lazy(() => import("../views/backstageManager/role")),
    exact: true,
  },
  {
    path: "/home/permission",
    component: lazy(() => import("../views/backstageManager/permission")),
    exact: true,
  },
  {
    path: "/home/order",
    component: lazy(() => import("../views/storeManager/order")),
    exact: true,
  },
  {
    path: "/home/goods",
    component: lazy(() => import("../views/storeManager/goods")),
    exact: true,
  }
];
// home路由
const homeRouter = [
  {
    path: "/home",
    component: lazy(() => import("../views/home")),
    exact: false,
  }
]
// 404路由
const notFoundRouter = [
  {
    path: "*",
    component: lazy(() => import("../views/notFound")),
    exact: false,
  }
]
export { parentRouter, sonRouter, homeRouter, notFoundRouter }