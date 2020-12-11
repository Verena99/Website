export default {
  proxy: {
    '/system': {
      target: 'http://XXXX/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/login': {
      target: 'http://xxxx/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/register': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/userCenter': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/admin': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
