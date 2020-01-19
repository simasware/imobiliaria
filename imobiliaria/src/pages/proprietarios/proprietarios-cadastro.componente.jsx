import React from "react";
import axios from "axios";
import { Form, Alert, Row, Col, Button } from "react-bootstrap";

class CadastroProprietario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      nome: "",
      email: "",
      telefone: "",
      dia_repasse: "",
      exibeAlerta: false
    };
    this.retornaDados = this.retornaDados.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async retornaDados() {
    const dados = await axios.post(
      "http://localhost/desafio-vista/api/proprietario/consultar.php",
      {
        campo: "id",
        valor: this.state.id,
        exata: "1"
      }
    );
    const { id, nome, email, telefone, dia_repasse } = dados.data.registros[0];
    this.setState({
      id: id,
      nome: nome,
      email: email,
      telefone: telefone,
      dia_repasse: dia_repasse
    });
  }

  async componentDidMount() {
    if (this.state.id > 0) {
      this.retornaDados();
    }
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.id > 0) {
      const params = {
        id: this.state.id,
        nome: this.state.nome,
        email: this.state.email,
        telefone: this.state.email,
        dia_repasse: this.state.dia_repasse
      };
      const updProp = await axios.post(
        "http://localhost/desafio-vista/api/proprietario/alterar.php",
        params
      );
      if (updProp.status === 200) {
        this.setState({
          exibeAlerta: true
        });
      }
    } else {
      const params = {
        nome: this.state.nome,
        email: this.state.email,
        telefone: this.state.email,
        dia_repasse: this.state.dia_repasse
      };
      const updProp = await axios.post(
        "http://localhost/desafio-vista/api/proprietario/novo.php",
        params
      );
      if (updProp.status === 200) {
        this.setState({
          exibeAlerta: true
        });
      }
    }
  }

  render() {
    const { nome, email, telefone, dia_repasse, exibeAlerta } = this.state;
    return (
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
        <h3>Proprietário</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="nome">
            <Form.Label column sm="2">
              Nome
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="Nome do cliente"
                value={nome}
                type="text"
                required
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="telefone">
            <Form.Label column sm="2">
              Endereço
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Endereço do cliente"
                value={telefone}
                required
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="email">
            <Form.Label column sm="2">
              e-mail
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="e-mail do cliente"
                value={email}
                required
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="dia_repasse">
            <Form.Label column sm="2">
              Dia de repasse
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Dia de repasse"
                value={dia_repasse}
                onChange={this.handleChange}
                required
                min={1}
                max={31}
              />
            </Col>
          </Form.Group>
          <Button type="submit">Salvar</Button>
        </Form>
      </div>
    );
  }
}

export default CadastroProprietario;
