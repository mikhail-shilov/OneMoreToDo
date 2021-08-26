import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/home'
import ToDo from '../components/ToDo'
import NotFound from '../components/404'

import Startup from './startup'

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/:category?/:timespan?" component={ToDo} />
            <Route exact path="/dashboard" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
