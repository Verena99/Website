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
    path: '/home',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/home',
        name: 'home',
        component: 'Home',
      },
    ],
  },
  {
    component: './404',
  },
];
