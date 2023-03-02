import React from "react";
import Index from "../src/Components/index";
import Report from "./Components/report";
import Error from "./Components/error";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Password from "./Components/password";
import Search from "./Components/search";
import MyCases from "./Components/mycases";
import Form from "./Components/form";
import Tracing from "./Components/tracing";
import CeroCases from "./Components/cerocases";
import Found from "./Components/found";
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/miscasos" exact component={MyCases} />
        <Route path="/" exact component={Index} />
        <Route path="/iniciarsesion" exact component={Login} />
        <Route path="/registrarse" exact component={Signup} />
        <Route path="/difundir" exact component={Report} />
        <Route path="/contrasena" exact component={Password} />
        <Route path="/buscar" exact component={Search} />
        <Route path="/formulario" exact component={Form} />
        <Route path="/cerocasos" exact component={CeroCases} />
        <Route path="/reportes/:idCaso" exact component={Tracing} />
        <Route path="/encontrados" exact component={Found} />
        <Route component={() => <Error />} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
