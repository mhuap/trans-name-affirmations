const prod = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: prod ? false : true
  }
})
