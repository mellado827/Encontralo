import React from 'react';
import Index from '../src/Components/index'
import Report from './Components/report'
import Error from './Components/error'
import Login from './Components/login'
import Signup from './Components/signup'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Password from './Components/password';
import Search from './Components/search'
import PersonalInfo from './Components/personalinfo';
import MyCases from './Components/mycases';
import Form from './Components/form'
import SearchReport from './Components/searchReport'

const App = () => (
  <Router>
    <Switch>
      <Route path="/miscasos" exact component={MyCases} />
      <Route path="/" exact component={Index} />
      <Route path="/iniciarsesion" exact component={Login} />
      <Route path="/registrarse" exact component={Signup} />
      <Route path="/reportar" exact component={Report} />
      <Route path="/datospersonales" exact component={PersonalInfo} />
      <Route path="/contrasena" exact component={Password} />
      <Route path="/buscar" exact component={Search} />
      <Route path="/formulario" exact component={Form} />
      <Route path='/reportes/:idReporte' exact component={SearchReport} />

      <Route component={() => (
        <Error />
      )} />


    </Switch>
  </Router>

)

export default App;
