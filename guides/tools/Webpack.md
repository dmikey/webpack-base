# Webpack Configuration
Webpack handles managing all of your project assets through the project source code
using loaders. Any images, styles, raw file content, etc. can be directly imported
into project JS code. This allows powerful transformations and explicit declaration
of what assets are used in a project.

## Analyzing Bundle Output

#### Webpack visualizer
The Webpack configs include the [`webpack-visualizer-plugin`][Webpack Visualizer]
which will output a dependencies graph to `/dist/stats.html` for production builds.
This can be used to analyze what the bundle is composed of.

#### Additional tools
Other visualizers/tools can be used with the bundle stats by generating a stats JSON
file. The `profile` and `json` flags must be passed to the Webpack call and the
results piped to a file:

`NODE_ENV=production webpack --env=production --profile --json > webpack-stats.json`

Visualization Tools:
- [Webpack Visualizer][]
- [Webpack Bundle Analyzer][]

<!-- Links -->
[Webpack Visualizer]: https://chrisbateman.github.io/webpack-visualizer/
[Webpack Bundle Analyzer]: https://github.com/webpack-contrib/webpack-bundle-analyzer

<!--
- Webpack (webpack.config.js)
  - Copy (/public index.html, favicon.ico)
  - Output (/build)


* An exported function will be called with an env defined with the `--env` option:
 * ```sh
 * webpack --env=production
 * ```


* The returned configuration object has the following shape:
 * ```json
 * {
 *   entry: {},
 *   output: {},
 *   devtool: '',
 *   resolve: {},
 *   module: {
 *     rules: []
 *   },
 *   plugins: [],
 *   // Production env only
 *   bail: true,
 *   performance: {},
 *   // Development env only
 *   devServer: {}
 * }
 * ```
-->