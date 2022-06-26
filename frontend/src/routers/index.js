import { lazy } from "react";
import layout from "../layout";
// 路由表
const routerList = [
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
  {
    path: "/",
    component: layout,
    exact: false,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: lazy(() => import("../views/home")),
        exact: true,
      }
    ]
  },
  {
    path: "/backstageManager",
    component: layout,
    exact: false,
    children: [
      {
        path: "/backstageManager/user",
        component: lazy(() => import("../views/backstageManager/user")),
        exact: true,
      },
      {
        path: "/backstageManager/role",
        component: lazy(() => import("../views/backstageManager/role")),
        exact: true,
      },
      {
        path: "/backstageManager/permission",
        component: lazy(() => import("../views/backstageManager/permission")),
        exact: true,
      },
    ]
  },
  {
    path: "/storeManager",
    component: layout,
    exact: false,
    children: [
      {
        path: "/storeManager/order",
        component: lazy(() => import("../views/storeManager/order")),
        exact: true,
      },
      {
        path: "/storeManager/goods",
        component: lazy(() => import("../views/storeManager/goods")),
        exact: true,
      }
    ]
  }
]
export default  routerList 