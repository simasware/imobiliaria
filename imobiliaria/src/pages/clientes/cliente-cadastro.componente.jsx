import React from "react";
import axios from "axios";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import CampoForm from "../../componentes/campo-form/campo-form.componente";

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
        this.setState({ exibeAlerta: true });
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
        this.setState({ exibeAlerta: true });
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
        <h3>Cliente</h3>
        <Form onSubmit={this.handleSubmit}>
          <CampoForm
            label="Nome"
            idComp="nome"
            placeHolder="Nome do cliente"
            valor={nome}
            handleChange={this.handleChange}
            tipoCampo="text"
            required
          />

          <CampoForm
            label="Endereço"
            idComp="endereco"
            placeHolder="Endereço do cliente"
            valor={endereco}
            handleChange={this.handleChange}
            tipoCampo="text"
            required
          />
          <CampoForm
            label="e-mail"
            idComp="email"
            placeHolder="e-mail do cliente"
            valor={email}
            handleChange={this.handleChange}
            tipoCampo="text"
            required
          />
          <Button type="submit">Salvar</Button>
        </Form>
      </div>
    );
  }
}

export default CadastroCliente;
