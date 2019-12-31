'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.0.206:8766/"',
  ENTRANCE: '"http://localhost:8801/inlay#/"',
  // ENTRANCE: '"http://center.neu.edu.cn:8801/inlay#/"',
  TIME_OUT: '"300000"'
})
