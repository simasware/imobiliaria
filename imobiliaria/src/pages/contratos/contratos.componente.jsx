import React from "react";
import axios from "axios";
import "./contratos.componente.css";
import DialogConfirmacao from "../../componentes/dialogo-confirmacao/dialogo-confirmacao.componente";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

class Contratos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contratos: []
    };
    this.excluiContrato = this.excluiContrato.bind(this);
    this.carregaDados = this.carregaDados.bind(this);
    this.formataDecimal = this.formataDecimal.bind(this);
  }

  async carregaDados() {
    const dados = await axios.post(
      "http://localhost/desafio-vista/api/contratos/listar.php"
    );
    this.setState({
      contratos: dados.data.registros
    });
  }

  componentDidMount() {
    const x = 950.0;
    let y = x.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    console.log(y);
    this.carregaDados();
  }

  excluiContrato() {
    console.log("excluido");
  }

  formataDecimal(valor) {
    return parseFloat(valor).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    });
  }

  render() {
    const { contratos } = this.state;
    return (
      <>
        <div className="imovel">
          <h1>Contratos</h1>
          <div className="botao-adicionar">
            <Button href="/contratos/novo">Novo Cadastro</Button>
          </div>
          <Table>
            <thead>
              <tr>
                <td>Código</td>
                <td>Proprietário</td>
                <td>Cliente</td>
                <td>Endereço</td>
                <td>Data de Início</td>
                <td>Data de Término</td>
                <td>Valor</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {contratos.map(imovel => {
                return (
                  <tr key={imovel.id}>
                    <td>{imovel.id}</td>
                    <td>{imovel.nome_proprietario}</td>
                    <td>{imovel.nome_cliente}</td>
                    <td>{imovel.endereco}</td>
                    <td>{new Date(imovel.data_inicio).toLocaleDateString()}</td>
                    <td>{new Date(imovel.data_final).toLocaleDateString()}</td>
                    <td>
                      {parseFloat(imovel.valor_aluguel).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL"
                        }
                      )}
                    </td>
                    <td>
                      <Container>
                        <Row>                          
                          <Col xs lg="3">
                            <Button href={`/contratos/editar/${imovel.id}`}>
                              Editar
                            </Button>
                          </Col>
                          <Col xs lg="3">
                            <DialogConfirmacao
                              titulo="Excluir"
                              mensagem="Confirmar exclusão do imovel? Ao confirmar todas as mensalidades serão excluidas."
                              handleDelete={this.excluiContrato}
                              id={imovel.id}
                            />
                          </Col>
                          <Col xs lg="3">
                            <Button href={`/mensalidades/${imovel.id}`}>
                              Mensalidades
                            </Button>
                          </Col>
                          <Col xs lg="3">
                            <Button href={`/repasses/${imovel.id}`}>
                              Repasses
                            </Button>
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

export default Contratos;
