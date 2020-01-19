import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Cabecalho = () => (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Imobiliaria</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            <Nav.Link href="/proprietarios">Proprietários</Nav.Link>
            <Nav.Link href="/imoveis">Imóveis</Nav.Link>
            <Nav.Link href="/contratos">Contratos</Nav.Link>
            </Nav>            
        </Navbar>        
  </>
);

export default Cabecalho;
