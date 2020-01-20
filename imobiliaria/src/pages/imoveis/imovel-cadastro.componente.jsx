import React from "react";
import axios from "axios";
import Select from "react-select";
import { Form, Alert, Row, Col, Button } from "react-bootstrap";

class CadastroImovel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      endereco: "",
      proprietario_id: null,
      listaProprietarios: [],
      exibeAlerta: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.carregaDados = this.carregaDados.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async carregaDados() {
    try {
      const dadosProprietarios = await axios.post(
        "http://localhost/desafio-vista/api/proprietario/listar.php"
      );
      let lista = dadosProprietarios.data.registros.map(item => {
        return { value: item.id, label: item.nome };
      });
      this.setState({
        listaProprietarios: lista
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const dados = await axios.post(
        "http://localhost/desafio-vista/api/imoveis/consultar.php",
        {
          campo: "id",
          valor: this.state.id,
          exata: "1"
        }
      );
      const { id, endereco, proprietario_id, nome_proprietario } = dados.data.registros[0];
      console.log(dados.data.registros[0]);
      this.setState({
        id: id,
        endereco: endereco,
        proprietario_id: {value: proprietario_id, label: nome_proprietario}
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleSelect(opcao) {
    console.log(opcao);
    this.setState({
      proprietario_id: opcao
    });
    console.log(this.state);
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value
    });
  }

  componentDidMount() {
    this.carregaDados();
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const {id} = this.state;
    if (id > 0){
      const updImovel = await axios.post("http://localhost/desafio-vista/api/imoveis/alterar.php", {
        id: this.state.id,
        endereco: this.state.endereco,
        proprietario_id: this.state.proprietario_id.value
      });
      if (updImovel.status === 200){
        this.setState({
          exibeAlerta: true
        })
      }
    } else {
      const novoImovel = await axios.post("http://localhost/desafio-vista/api/imoveis/novo.php",
      {
        endereco: this.state.endereco,
        proprietario_id: this.state.proprietario_id.value
      });
      if (novoImovel.status === 200){
        this.setState({
          exibeAlerta: true
        })
      }
    }
  }

  render() {
    const {
      listaProprietarios,
      proprietario_id,
      endereco,
      exibeAlerta
    } = this.state;
    return (
      <>
        <div className="form-cadastro">
          {exibeAlerta ? (
            <Alert
              key="1"
              variant="success"
              dismissible={true}
              onClose={() => this.setState({ exibeAlerta: false })}
            >
              Ação finalizada com sucesso!
            </Alert>
          ) : (
            ""
          )}
          <h3>Imóveis</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="nome">
              <Form.Label column sm="2">
                Proprietário
              </Form.Label>
              <Col sm="10">
                <Select
                  value={proprietario_id}
                  onChange={this.handleSelect}
                  options={listaProprietarios}
                  placeholder="Selecionar proprietário"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endereco">
              <Form.Label column sm="2">
                Endereço
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Endereço do cliente"
                  value={endereco}
                  required
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Button type="submit">Salvar</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default CadastroImovel;
