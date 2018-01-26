/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import localStorageSVGLoader from 'svg-symbol-sprite-loader/src/local-storage-svg-loader'
import { AppContainer } from 'react-hot-loader'

// ========================================================
// Application Core Elements
// ========================================================
// ⚠️ Import application styles before application components so that base CSS
// styles are included before component styles.
import './styles/index.scss'
import App from './components/App'
import store from './store/store'

// Inject SVG symbol sprite into document from local storage if exists, otherwise
// fetch, cache in local storage and inject. Manifest is inlined to index.html by
// webpack
localStorageSVGLoader(window.webpackManifest['icon-sprite.svg'])

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
