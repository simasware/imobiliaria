import React from "react";
import axios from "axios";
import Select from "react-select";
import { Form, Alert, Row, Col, Button } from "react-bootstrap";
import CampoForm from "../../componentes/campo-form/campo-form.componente";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import parseISO from "date-fns/parseISO";
import "react-datepicker/dist/react-datepicker.css";

class CadastroContrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      proprietario_id: null,
      cliente_id: null,
      imovel_id: null,
      data_inicio: new Date(),
      data_final: new Date(),
      taxa_administracao: "0",
      valor_aluguel: "0",
      valor_iptu: "0",
      valor_condominio: "0",
      listaProprietarios: [],
      listaImoveis: [],
      exibeAlerta: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.carregaDados = this.carregaDados.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImovelSelect = this.handleImovelSelect.bind(this);
    this.handleClienteSelect = this.handleClienteSelect.bind(this);
    this.handleDataInicio = this.handleDataInicio.bind(this);
    this.handleDataFim = this.handleDataFim.bind(this);
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
      const dadosClientes = await axios.post(
        "http://localhost/desafio-vista/api/cliente/listar.php"
      );
      let listaClientes = dadosClientes.data.registros.map(item => {
        return { value: item.id, label: item.nome };
      });
      this.setState({
        listaClientes: listaClientes
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const dadosImoveis = await axios.post(
        "http://localhost/desafio-vista/api/imoveis/listar.php"
      );
      let listaImoveis = dadosImoveis.data.registros.map(item => {
        return {
          value: item.id,
          label: item.endereco,
          proprietario_id: item.proprietario_id
        };
      });
      this.setState({
        listaImoveis: listaImoveis
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const dados = await axios.post(
        "http://localhost/desafio-vista/api/contratos/consultar.php",
        {
          campo: "id",
          valor: this.state.id,
          exata: "1"
        }
      );
      const dadosContrato = dados.data.registros[0];
      console.log(dadosContrato.valor_aluguel.replace(".",","));
      this.setState({
        proprietario_id: {value: dadosContrato.proprietario_id, label: dadosContrato.nome_proprietario},
        cliente_id: {value: dadosContrato.cliente_id, label: dadosContrato.nome_cliente},
        imovel_id: {value: dadosContrato.imovel_id, label: dadosContrato.endereco},
        data_inicio: parseISO(dadosContrato.data_inicio),
        data_final: parseISO(dadosContrato.data_final),
        taxa_administracao: dadosContrato.taxa_administracao.replace(".", ","),
        valor_aluguel: dadosContrato.valor_aluguel.replace(".", ","),
        valor_iptu: dadosContrato.valor_iptu.replace(".", ","),
        valor_condominio: dadosContrato.valor_condominio.replace(".", ",")
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleImovelSelect(opcao) {
    this.setState({
      imovel_id: opcao
    });
  }

  handleClienteSelect(opcao) {
    this.setState({
      cliente_id: opcao
    });
  }

  handleSelect(opcao) {
    this.setState({
      proprietario_id: opcao,
      imovel_id: {}
    });
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value
    });
  }

  handleDataInicio(data) {
    this.setState({
      data_inicio: data
    });
  }

  handleDataFim(data) {
    this.setState({
      data_final: data
    });
  }

  componentDidMount() {
    this.carregaDados();
  }

  async handleSubmit(event) {
    const { id } = this.state;
    event.preventDefault();
    if (id > 0) {
      const updImovel = await axios.post(
        "http://localhost/desafio-vista/api/contratos/alterar.php",
        {
          id: this.state.id,
          proprietario_id: this.state.proprietario_id.value,
          cliente_id: this.state.cliente_id.value,
          imovel_id: this.state.imovel_id.value,
          data_inicio: this.state.data_inicio.toISOString(),
          data_final: this.state.data_final.toISOString(),
          taxa_administracao: parseFloat(
            this.state.taxa_administracao.replace(",", ".")
          ),
          valor_aluguel: parseFloat(this.state.valor_aluguel.replace(",", ".")),
          valor_condominio: parseFloat(
            this.state.valor_condominio.replace(",", ".")
          ),
          valor_iptu: parseFloat(this.state.valor_iptu.replace(",", "."))
        }
      );
      if (updImovel.status === 200) {
        this.setState({
          exibeAlerta: true
        });
      }
    } else {
      const novoImovel = await axios.post(
        "http://localhost/desafio-vista/api/contratos/novo.php",
        {
          proprietario_id: this.state.proprietario_id.value,
          cliente_id: this.state.cliente_id.value,
          imovel_id: this.state.imovel_id.value,
          data_inicio: this.state.data_inicio.toISOString(),
          data_final: this.state.data_final.toISOString(),
          taxa_administracao: parseFloat(
            this.state.taxa_administracao.replace(",", ".")
          ),
          valor_aluguel: parseFloat(this.state.valor_aluguel.replace(",", ".")),
          valor_condominio: parseFloat(
            this.state.valor_condominio.replace(",", ".")
          ),
          valor_iptu: parseFloat(this.state.valor_iptu.replace(",", "."))
        }
      );
      if (novoImovel.status === 200) {
        this.setState({
          exibeAlerta: true
        });
      }
    }
  }

  render() {
    const {
      listaProprietarios,
      listaImoveis,
      listaClientes,
      proprietario_id,
      cliente_id,
      imovel_id,
      exibeAlerta
    } = this.state;
    let listaFiltrada = listaImoveis.filter(imovel => {
      if (proprietario_id) {
        return imovel.proprietario_id === proprietario_id.value;
      }
    });

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
          <h3>Contratos</h3>
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

            <Form.Group as={Row} controlId="imovel_id">
              <Form.Label column sm="2">
                Imóvel
              </Form.Label>
              <Col sm="10">
                <Select
                  value={imovel_id}
                  onChange={this.handleImovelSelect}
                  options={listaFiltrada}
                  placeholder="Selecionar imóvel"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cliente_id">
              <Form.Label column sm="2">
                Cliente
              </Form.Label>
              <Col sm="10">
                <Select
                  value={cliente_id}
                  onChange={this.handleClienteSelect}
                  options={listaClientes}
                  placeholder="Selecionar cliente"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="data_inicio">
              <Form.Label column sm="2">
                Data de Inicio
              </Form.Label>
              <Col sm="10">
                <DatePicker
                  selected={this.state.data_inicio}
                  onChange={this.handleDataInicio}
                  locale={ptBR}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="data_final">
              <Form.Label column sm="2">
                Data de Término
              </Form.Label>
              <Col sm="10">
                <DatePicker
                  selected={this.state.data_final}
                  onChange={this.handleDataFim}
                  locale={ptBR}
                />
              </Col>
            </Form.Group>
            <CampoForm
              label="Valor Aluguel R$"
              idComp="valor_aluguel"
              placeHolder="Valor do Aluguel"
              valor={this.state.valor_aluguel}
              handleChange={this.handleChange}
              tipoCampo="text"
              step="any"
            />
            <CampoForm
              label="Taxa de Administração R$"
              idComp="taxa_administracao"
              placeHolder="Valor da taxa"
              valor={this.state.taxa_administracao}
              handleChange={this.handleChange}
            />
            <CampoForm
              label="Valor Condominio R$"
              idComp="valor_condominio"
              placeHolder="Valor do condominio"
              valor={this.state.valor_condominio}
              handleChange={this.handleChange}
            />
            <CampoForm
              label="Valor IPTU R$"
              idComp="valor_iptu"
              placeHolder="Valor do IPTU"
              valor={this.state.valor_iptu}
              handleChange={this.handleChange}
            />
            <Button type="submit">Salvar</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default CadastroContrato;
