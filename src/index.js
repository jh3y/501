import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['players']
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)
ReactDOM.render(<App store={store} persistor={persistor} />, document.getElementById('root'))

registerServiceWorker()
