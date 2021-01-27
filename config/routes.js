export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: 'Login',
      },
    ],
  },
  {
    path: '/register',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'register',
        path: '/register',
        component: 'Register',
      },
    ],
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: './userCenter/personInfo',
  },
  {
    path: '/system',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/system',
        redirect: '/system/firstPage',
      },
      {
        path: '/system/firstPage',
        name: 'firstPage',
        component: './index',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
