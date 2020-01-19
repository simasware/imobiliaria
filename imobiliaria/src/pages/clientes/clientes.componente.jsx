import React from "react";
import axios from "axios";
import DialogConfirmacao from "../../componentes/dialogo-confirmacao/dialogo-confirmacao.componente";
import "./clientes.componente.css";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

class Clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: []
    };
    this.excluiCliente = this.excluiCliente.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  async loadData() {
    let dados = await axios.post(
      `http://localhost/desafio-vista/api/cliente/listar.php`
    );
    this.setState({ clientes: dados.data.registros });
  }

  async excluiCliente(event) {
    const id = event.target.dataset.id;
    let exc = await axios.post(
      `http://localhost/desafio-vista/api/cliente/excluir.php`,
      {
        id: id
      }
    );
    if (exc.status === 200) {
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { clientes } = this.state;
    return (
      <>
        <div className="cliente">
          <h1>Clientes</h1>
          <div className="botao-adicionar">
            <Button href="/clientes/novo">Novo Cadastro</Button>
          </div>
          <Table>
            <thead>
              <tr>
                <td>Código</td>
                <td>Nome</td>
                <td>Endereço</td>
                <td>e-mail</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => {
                return (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.endereco}</td>
                    <td>{cliente.email}</td>
                    <td>
                      <Container>
                        <Row>
                          <Col xs lg="3">
                            <Button href={`/clientes/editar/${cliente.id}`}>
                              Editar
                            </Button>
                          </Col>
                          <Col xs lg="3">
                            <DialogConfirmacao
                              titulo="Excluir"
                              mensagem="Confirmar exclusão do cliente?"
                              handleDelete={this.excluiCliente}
                              id={cliente.id}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Clientes;
