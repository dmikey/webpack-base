'use strict';
const merge = require('webpack-merge');
let common = require('./lib/common');
let development = require('./lib/development');
let production = require('./lib/production');

// ========================================================
// Webpack Root Configuration
// See guides/architecture/build - Webpack
// ========================================================

module.exports = (env='development', paths={}) => {
  // See guides/architecture - .babelrc env
  process.env.BABEL_ENV = env;
  console.info(`Webpack running for ${env}`);

  // Generate shared configs
  common = common(paths);

  // Use webpack-merge and dev vs prod specific configs to return complete webpack
  // configuration object
  if (env === 'production') {
    production = production(paths);
    return merge(common, production);
  } else {
    development = development(paths);
    return merge(common, development);
  }
};
