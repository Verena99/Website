// https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000/',
      // target: 'http://127.0.0.1:3000/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
