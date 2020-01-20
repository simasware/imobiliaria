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
        <div className="contrato">
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
              {contratos.map(contrato => {
                return (
                  <tr key={contrato.id}>
                    <td>{contrato.id}</td>
                    <td>{contrato.nome_proprietario}</td>
                    <td>{contrato.nome_cliente}</td>
                    <td>{contrato.endereco}</td>
                    <td>{new Date(contrato.data_inicio).toLocaleDateString()}</td>
                    <td>{new Date(contrato.data_final).toLocaleDateString()}</td>
                    <td>
                      {parseFloat(contrato.valor_aluguel).toLocaleString(
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
                            <Button href={`/contratos/editar/${contrato.id}`}>
                              Editar
                            </Button>
                          </Col>
                          <Col xs lg="3">
                            <DialogConfirmacao
                              titulo="Excluir"
                              mensagem="Confirmar exclusão do contrato? Ao confirmar todas as mensalidades serão excluidas."
                              handleDelete={this.excluiContrato}
                              id={contrato.id}
                            />
                          </Col>
                          <Col xs lg="3">
                            <Button href={`/pagamentos/${contrato.id}`}>
                              Pagamentos
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
