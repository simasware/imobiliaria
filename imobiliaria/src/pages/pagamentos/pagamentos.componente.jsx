import React from "react";
import axios from "axios";
import ListaMensalidades from "../../componentes/lista-mensalidades/lista-mensalidades.componente";
import ListaRepasses from "../../componentes/lista-repasses/lista-repasses.componente";

import { Container, Row, Col } from "react-bootstrap";

class Pagamentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mensalidades: [],
      repasses: [],
      contrato_id: this.props.match.params.id
    };
    this.carregaDados = this.carregaDados.bind(this);
    this.handleBaixaMensalidade = this.handleBaixaMensalidade.bind(this);
    this.handleBaixaRepasse = this.handleBaixaRepasse.bind(this);
  }

  async carregaDados() {
    const dadosMensalidade = await axios.post(
      "http://localhost/desafio-vista/api/pagamentos/mensalidades.php",
      {
        id: this.state.contrato_id
      }
    );
    this.setState({
      mensalidades: dadosMensalidade.data.registros
    });
    const dadosRepasses = await axios.post(
      "http://localhost/desafio-vista/api/pagamentos/repasses.php",
      {
        id: this.state.contrato_id
      }
    );
    this.setState({
      repasses: dadosRepasses.data.registros
    });    
  }

  componentDidMount() {
    this.carregaDados();
  }

  async handleBaixaMensalidade(event) {
    const idMensalidade = event.target.dataset.id;    
    const mensalidade = await axios.post("http://localhost/desafio-vista/api/pagamentos/baixa_mensalidade.php",{
        id_contrato: this.state.contrato_id,
        id_mensalidade: idMensalidade
    });
    if (mensalidade.status === 200){
        this.carregaDados();
    }else {
        console.log(mensalidade.data);
    }
  }

  async handleBaixaRepasse(event){
      const idRepasse = event.target.dataset.id;
      const repasse = await axios.post("http://localhost/desafio-vista/api/pagamentos/baixa_repasse.php",{
          id_contrato: this.state.contrato_id,
          id_repasse: idRepasse
      });
      if (repasse.status === 200){
          this.carregaDados();
      }
  }

  render() {
    const { mensalidades, repasses } = this.state;
    return (
      <>
        <div className="contrato">
          <Container>            
            <Row>
              <Col>
                <h1>Pagamentos</h1>
                <ListaMensalidades
                  dados={mensalidades}
                  handleSubmit={this.handleBaixaMensalidade}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>Repasses</h1>
                <ListaRepasses
                  dados={repasses}
                  handleSubmit={this.handleBaixaRepasse}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Pagamentos;
