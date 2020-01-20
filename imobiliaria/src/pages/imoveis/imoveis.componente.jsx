import React from "react";
import axios from "axios";
import DialogConfirmacao from "../../componentes/dialogo-confirmacao/dialogo-confirmacao.componente";
import "./imoveis.componente.css";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

class Imoveis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imoveis: []
    };
    this.excluiImovel = this.excluiImovel.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  async loadData() {
    let dados = await axios.post(
      `http://localhost/desafio-vista/api/imoveis/listar.php`
    );
    this.setState({ imoveis: dados.data.registros });
  }

  async excluiImovel(event) {
    const id = event.target.dataset.id;
    let exc = await axios.post(
      `http://localhost/desafio-vista/api/imoveis/excluir.php`,
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
    const { imoveis } = this.state;
    return (
      <>
        <div className="imovel">
          <h1>Imóveis</h1>
          <div className="botao-adicionar">
            <Button href="/imoveis/novo">Novo Cadastro</Button>
          </div>
          <Table>
            <thead>
              <tr>
                <td>Código</td>
                <td>Proprietário</td>
                <td>Endereço</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {imoveis.map(imovel => {
                return (
                  <tr key={imovel.id}>
                    <td>{imovel.id}</td>
                    <td>{imovel.nome_proprietario}</td>
                    <td>{imovel.endereco}</td>
                    <td>
                      <Container>
                        <Row>
                          <Col xs lg="3">
                            <Button href={`/imoveis/editar/${imovel.id}`}>
                              Editar
                            </Button>
                          </Col>
                          <Col xs lg="3">
                            <DialogConfirmacao
                              titulo="Excluir"
                              mensagem="Confirmar exclusão do imovel?"
                              handleDelete={this.excluiImovel}
                              id={imovel.id}
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

export default Imoveis;
