import React from "react";
import Cabecalho from "./componentes/cabecalho/cabecalho.componente";
import { Route, Switch } from "react-router-dom";
import Clientes from "./pages/clientes/clientes.componente";
import CadastroCliente from "./pages/clientes/cliente-cadastro.componente";
import CadastroProprietario from "./pages/proprietarios/proprietarios-cadastro.componente";
import Proprietarios from "./pages/proprietarios/proprietarios.componente";
import Imoveis from "./pages/imoveis/imoveis.componente";
import CadastroImovel from "./pages/imoveis/imovel-cadastro.componente";
import Contratos from "./pages/contratos/contratos.componente";
import CadastroContrato from "./pages/contratos/cadastro-contrato.componente";


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
        <Route exact path="/imoveis" component={Imoveis}/>
        <Route exact path="/imoveis/novo" component={CadastroImovel}/>
        <Route exact path="/imoveis/editar/:id" component={CadastroImovel}/>
        <Route exact path="/contratos" component={Contratos}/>
        <Route exact path="/contratos/novo" component={CadastroContrato}/>
        <Route exact path="/contratos/editar/:id" component={CadastroContrato}/>
      </Switch>
      
    </div>
  );
}

export default App;
