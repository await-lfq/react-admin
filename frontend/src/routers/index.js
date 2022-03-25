import { lazy } from "react";

// 主路由
const parentRouter = [
  {
    path: "/login",
    components: lazy(() => import("../views/login")),
    exact: true,
  },
  {
    path: "/register",
    components: lazy(() => import("../views/register")),
    exact: true,
  },
  {
    path: "/home",
    components: lazy(() => import("../views/home")),
    exact: false,
  }
]
// 子路由

const sonRouter = [
  {
    path: "/home/index",
    components: lazy(() => import("../views/homeIndex")),
    exact: true,
  },
  {
    path: "/home/user",
    components: lazy(() => import("../views/backstageManager/user")),
    exact: true,
  },
  {
    path: "/home/role",
    components: lazy(() => import("../backstageManager/role")),
    exact: true,
  },
  {
    path: "/home/permission",
    components: lazy(() => import("../views/backstageManager/permission")),
    exact: true,
  },
  {
    path: "/home/order",
    components: lazy(() => import("../views/storeManager/order")),
    exact: true,
  },
  {
    path: "/home/goods",
    components: lazy(() => import("../views/storeManager/goods")),
    exact: true,
  }
];
export { parentRouter, sonRouter }