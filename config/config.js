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
      target: 'http://localhost:6789/api',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
