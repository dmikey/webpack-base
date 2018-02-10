const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const webpack = require('webpack')

/**
 * Development environment specfic configurations
 * @param {Object} config
 * @return {Object} Development specific configurations to merge with cross
 * environment configurations
 */
module.exports = ({
  appPublic,
  babelLoaderInclude,
  devServer,
  sassIncludePaths,
  svgSprites,
}) => ({
  // This makes the bundle appear split into separate modules in the devtools.
  // We don't use source maps here because they can be confusing:
  // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
  // You may want 'cheap-module-source-map' instead if you prefer source maps.
  devtool: 'eval',

  // Dev Loader Definitions
  // ---------------------------------------------------------------------------
  module: {
    rules: [
      // ========================================================
      // JS Loader
      // ========================================================

      // Dev JS loader runs source through ESLint then Babel
      {
        test: /\.jsx?$/,
        // Only use loader with explicitly included files
        include: babelLoaderInclude,
        /**
         * ## Using Eslint Loader
         * The `eslint-loader` will run imported modules through eslint first and
         * surface errors/warnings in the webpack build (These are also picked up by
         * the webpack-dev-server).
         *
         * **DEPENDENCIES**: This package only includes the eslint-loader package,
         * `eslint` and any packages required to run the eslint rules for a project
         * must be included by that project. This allows projects to handle
         * specifying and configuring eslint explicitly as required.
         */
        use: [
          { loader: 'babel-loader' },
          ...svgSprites, // Import those svgs!
          { loader: 'eslint-loader' },
        ],
      },

      // ========================================================
      // Styles Loader
      // ========================================================

      // Do not extract into a separate file in dev environment
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]-[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Allows for aliased imports from include paths, especially useful
              // for importing app theme variables and mixins into component styles
              includePaths: sassIncludePaths,
            },
          },
        ],
      },
    ],
  },

  // Dev Plugin Definitions
  // ---------------------------------------------------------------------------
  plugins: [
    // ========================================================
    // Indicators
    // ========================================================

    // Shows and clears errors in a easier to read format
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `  🎉  ${chalk.bold.green('BINGO')} 🎉`,
          `  Application running at ${chalk.underline.blue(
            `http://localhost:${devServer.port || 3000}`
          )}`,
        ],
        notes: [],
      },
    }),

    // ========================================================
    // 🔥 Modules
    // ========================================================

    // HMR - see guides/architecture/build
    new webpack.HotModuleReplacementPlugin(),
    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  // Dev Server
  // ---------------------------------------------------------------------------
  devServer: Object.assign(
    {
      // Tell the server where to serve content from. This is only necessary if you
      // want to serve static files.
      contentBase: appPublic,
      // enable gzip compression
      compress: true,
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      // true for index.html upon 404, object for multiple paths
      historyApiFallback: true,
      // The. port.
      port: 3000,
      // See guides/architecture/build - HMR
      hot: true,
      // true for self-signed, object for cert authority
      https: false,
      // only errors & warns on hot reload
      noInfo: true,
      // overlay: true captures only errors
      overlay: {
        errors: true,
        warnings: false,
      },
      // Suppresses output from dev-server, the FriendlyErrors plugin displays clean
      // error messagging
      quiet: true,
    },
    // ℹ️ Any custom configurations passed to configs will override the defaults
    devServer
  ),
})