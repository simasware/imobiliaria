import React from "react";
import Cabecalho from "./componentes/cabecalho/cabecalho.componente";
import { Route, Switch } from "react-router-dom";
import Clientes from "./pages/clientes/clientes.componente";
import CadastroCliente from "./pages/clientes/cliente-cadastro.componente";
import CadastroProprietario from "./pages/proprietarios/proprietarios-cadastro.componente";
import Proprietarios from "./pages/proprietarios/proprietarios.componente";

import "./App.css";

function App() {  
  return (
    <div className="App">
      <Cabecalho />
      <Switch>
        <Route exact path="/clientes" component={Clientes}/>
        <Route exact path="/clientes/editar/:id" component={CadastroCliente}/>
        <Route exact path="/clientes/novo" component={CadastroCliente}/>
        <Route exact path="/proprietarios" component={Proprietarios}/>
        <Route exact path="/proprietarios/editar/:id" component={CadastroProprietario}/>
        <Route exact path="/proprietarios/novo" component={CadastroProprietario}/>
      </Switch>
      
    </div>
  );
}

export default App;
