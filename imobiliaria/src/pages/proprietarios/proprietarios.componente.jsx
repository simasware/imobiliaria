import React from "react";
import axios from "axios";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import DialogConfirmacao from "../../componentes/dialogo-confirmacao/dialogo-confirmacao.componente";
import "./proprietarios.componente.css";

class Proprietarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proprietarios: []
    };
    this.excluiProprietario = this.excluiProprietario.bind(this);
    this.retornaDados = this.retornaDados.bind(this);
  }

  async retornaDados(){
    const dados = await axios.post(
        "http://localhost/desafio-vista/api/proprietario/listar.php"
      );
      this.setState({
          proprietarios: dados.data.registros
      })
  }

  async componentDidMount() {
    this.retornaDados();
  }

  async excluiProprietario (event) {
      const idProprietario = event.target.dataset.id;
      const exc = await axios.post("http://localhost/desafio-vista/api/proprietario/excluir.php",
      {
          id: idProprietario
      });      
      if (exc.status === 200){
          this.retornaDados();
      }
  }

  render() {
    const { proprietarios } = this.state;
    return (
      <>
        <div className="proprietario">
          <h1>Proprietarios</h1>
          <div className="botao-adicionar">
            <Button href="/proprietarios/novo">Novo Cadastro</Button>
          </div>
          <Table>
            <thead>
              <tr>
                <td>Código</td>
                <td>Nome</td>
                <td>email</td>
                <td>Telefone</td>
                <td>Dia de Repasse</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {proprietarios.map(proprietario => {
                return (
                  <tr key={proprietario.id}>
                    <td>{proprietario.id}</td>
                    <td>{proprietario.nome}</td>
                    <td>{proprietario.email}</td>
                    <td>{proprietario.telefone}</td>
                    <td>{proprietario.dia_repasse}</td>
                    <td>
                      <Container>
                        <Row>
                          <Col xs lg="3">
                            <Button href={`/proprietarios/editar/${proprietario.id}`}>
                              Editar
                            </Button>
                          </Col>
                          <Col xs lg="3">
                            <DialogConfirmacao
                              titulo="Excluir"
                              mensagem="Confirmar exclusão do proprietario?"
                              handleDelete={this.excluiProprietario}
                              id={proprietario.id}
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

export default Proprietarios;
