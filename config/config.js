import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
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
              path: '/system/tokenReceive',
              redirect: '/system/tokenReceive/searchToken',
            },
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
              path: '/system/tokenReceive/applyToken/:tokenId',
              component: './tokenReceive/applyToken',
              name: 'applyToken',
            },
            {
              path: '/system/tokenReceive/changeApplication/:tokenId',
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
