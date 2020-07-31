const pkg = require('./package');
require('dotenv').config();

module.exports = {
  env: {
    baseUrl: 'https://test-frontend-api.herokuapp.com',
  },
  head: {
    title: 'Galaxies',
    meta: [
      {charset: 'utf-8'},
      {httpEquiv: 'x-ua-compatible', content: 'ie=edge'},
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,maximum-scale=2.0,maximum-scale=1.0',
      },
      {hid: 'description', name: 'description', content: pkg.description},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto',
        rel: 'stylesheet',
      },
      {href: 'https://fonts.googleapis.com/css?family=Lato', rel: 'stylesheet'},
    ],
  },
  modules: [
    '@nuxt/http',
  ],
  css: [
      {src: '~assets/postcss/index.pcss'},
  ],
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-nested': {},
      },
    }
  },
};
