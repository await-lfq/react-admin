const { addWebpackAlias, override } = require('customize-cra');
const { resolve } = require('path')
module.exports = override(
  addWebpackAlias({
    '@': resolve('src')
  })
)