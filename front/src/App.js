import React, { useContext } from 'react';
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
import SearchMyCases from './Components/searchMyCases'
import Tracing from './Components/tracing'
import { CRMContext, CRMProvider } from './context/CRMContext'
import CeroCases from './Components/cerocases';
import EditReport from './Components/editReport'
import ResetPassword from './Components/resetPassword'

function App() {

  const [auth, guardarAuth] = useContext(CRMContext)

  return (
    <Router>
      <>
        <CRMProvider value={[auth, guardarAuth]}>

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
            <Route path='/buscar/:idReporte' exact component={SearchReport} />
            <Route path="cerocasos" exact component={CeroCases} />
            <Route path="/miscasos/:usuario/:dep" exact component={SearchMyCases} />
            <Route path="/reportes/:idCaso" exact component={Tracing} />
            <Route path="/reportes/:idCaso/editar" exact component={EditReport} />
            <Route path="/olvidemicontrasena" exact component={ResetPassword} />

            <Route component={() => (
              <Error />
            )} />

          </Switch>

        </CRMProvider>
      </>
    </Router>
  )
}

export default App;
