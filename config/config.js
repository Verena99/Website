import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    hmr: true,
  },
  antd: {},
  routes: [
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
      path: '/admin',
      component: '../layouts/AdminLayout',
      routes: [
        {
          name: 'allUser',
          path: '/admin/allUser',
          component: './Admin/allUser',
        },
        {
          name: 'allToken',
          path: '/admin/allToken',
          component: './Admin/allToken',
        },
        {
          name: 'allApplication',
          path: '/admin/allApplication',
          component: './Admin/allApplication',
        },
        {
          name: 'incomeInfo',
          path: '/admin/incomeInfo',
          component: './Admin/incomeInfo',
        },
        {
          name: 'userInfo',
          path: '/admin/userInfo/:userId',
          component: './Admin/userInfo',
        },
        {
          name: 'tokenInfo',
          path: '/admin/tokenInfo/:tokenId',
          component: './Admin/tokenInfo',
        },
      ],
    },
    {
      path: '/system',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/system',
          redirect: '/system/tokenHolder',
        },
        {
          name: 'tokenHolder',
          path: '/system/tokenHolder',
          component: './tokenHolder/',
        },
        {
          name: 'tokenReceive',
          path: '/system/tokenReceive',
          component: './tokenReceive/',
          routes: [
            {
              path: '/system/tokenReceive/searchToken',
              component: './tokenReceive/searchToken',
              name: 'searchToken',
            },
            {
              path: '/system/tokenReceive/showToken/:tokenId',
              component: './tokenReceive/showToken',
              name: 'showToken',
            },
            {
              path: '/system/tokenReceive/myApplication',
              component: './tokenReceive/myApplication',
              name: 'myApplication',
            },
            {
              path: '/system/tokenReceive/myToken',
              component: './tokenReceive/myToken',
              name: 'myToken',
            },
            {
              path: '/system/tokenReceive/rejectedToken',
              component: './tokenReceive/rejectedToken',
              name: 'rejectedToken',
            },
            {
              path: '/system/tokenReceive/applyToken',
              component: './tokenReceive/applyToken',
              name: 'applyToken',
            },
            {
              path: '/system/tokenReceive/changeApplication',
              component: './tokenReceive/changeApplication',
              name: 'changeApplication',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
});
