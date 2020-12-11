export default {
  proxy: {
    '/api': {
      target: 'http://localhost:9093',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
};
