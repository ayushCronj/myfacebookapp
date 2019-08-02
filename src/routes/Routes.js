import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../components/login'
import Register from '../components/register'
import Forget from '../components/forget'
import Home from '../components/home'
import OTPverify from '../components/otpverify'
import Landing from '../components/landing'
import NotFound from '../components/notfound'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
      <Route exact path="/main" component={Login} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forget" component={Forget} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/otpverify' component={OTPverify} />
      <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)

export default Root