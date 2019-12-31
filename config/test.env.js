'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  // BASE_API: '"http://cloud-gate.neunb.web"',
  BASE_API: '"http://stuinfo.neu.edu.cn:8766/api/"',
  TIME_OUT: '"100000"'
})
