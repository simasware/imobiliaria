import React from "react";
import axios from "axios";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

class CadastroCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      nome: "",
      email: "",
      endereco: "",
      exibeAlerta: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retornaDados = this.retornaDados.bind(this);
  }

  async retornaDados() {
    let dadosCliente = await axios.post(
      `http://localhost/desafio-vista/api/cliente/consultar.php`,
      {
        campo: "id",
        valor: this.state.id,
        exata: "1"
      }
    );

    const { id, nome, endereco, email } = dadosCliente.data.registros[0];
    this.setState({
      id: id,
      nome: nome,
      endereco: endereco,
      email: email
    });
  }

  componentDidMount() {
    if (this.state.id > 0) {
      this.retornaDados(1);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { id } = this.state;    
    if (id > 0) {
      const params = {
        id: this.state.id,
        nome: this.state.nome,
        endereco: this.state.endereco,
        email: this.state.email
      };
      const updCliente = await axios.post(
        `http://localhost/desafio-vista/api/cliente/alterar.php`,
        params,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );      
      if (updCliente.status === 200) {
        this.setState({exibeAlerta: true});
      }
    } else {
      const params = {
        nome: this.state.nome,
        endereco: this.state.endereco,
        email: this.state.email
      };
      let updCliente = await axios.post(
        `http://localhost/desafio-vista/api/cliente/novo.php`,
        params,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }        
      );
      if (updCliente.status === 200) {
        this.setState({exibeAlerta: true});
      }
    }
  }

  handleChange = event => {
    const { value, id } = event.target;

    this.setState({
      [id]: value
    });
  };

  render() {
    const { nome, endereco, email, exibeAlerta } = this.state;    
    return (      
      <div className="form-cadastro">
        { exibeAlerta ? (
          <Alert key="1" variant="success" dismissible={true} onClose={() => this.setState({exibeAlerta: false})}>
            Ação finalizada com sucesso!
          </Alert>
        ) : (
          ""
        )}
        <h3>Cliente</h3>
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
          <Button type="submit">Salvar</Button>
        </Form>
      </div>
    );
  }
}

export default CadastroCliente;
