import React from "react";
import axios from "axios";
import { Form, Alert, Row, Col, Button } from "react-bootstrap";
import CampoForm from "../../componentes/campo-form/campo-form.componente";

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
          <CampoForm
            label="Nome"
            idComp="nome"
            placeHolder="Nome do proprietário"
            valor={nome}
            handleChange={this.handleChange}
            tipoCampo="text"
          />
          <CampoForm
            label="Telefone"
            idComp="telefone"
            placeHolder="Telefone do proprietário"
            valor={telefone}
            handleChange={this.handleChange}
            tipoCampo="text"
          />
          <CampoForm
            label="e-mail"
            idComp="email"
            placeHolder="e-mail do proprietário"
            valor={email}
            handleChange={this.handleChange}
            tipoCampo="text"
            required
          />
          <CampoForm
            label="Dia de Repasse"
            idComp="dia_repasse"
            placeHolder="Dia de repasse"
            valor={dia_repasse}
            handleChange={this.handleChange}
            tipoCampo="number"
            required
            otherProps={{min: 1, max: 31}}
          />
          <Button type="submit">Salvar</Button>
        </Form>
      </div>
    );
  }
}

export default CadastroProprietario;
