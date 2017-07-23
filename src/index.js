import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import App from './App'
import reducers from './reducers'

// const store = applyMiddleware()(createStore)(reducers)
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware()
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
