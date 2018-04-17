import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import SetUp from './containers/SetUp'
import Home from './containers/Home'
import Game from './containers/Game'

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
`

const Loader = styled.div`
  height: 100px;
  width: 100px;
  background: red;
`

const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <Router>
        <Container>
          <Route exact path="/" component={Home} />
          <Route path="/setup" component={SetUp} />
          <Route path="/game" component={Game} />
        </Container>
      </Router>
    </PersistGate>
  </Provider>
)

export default hot(module)(App)
