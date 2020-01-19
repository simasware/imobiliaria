import React from "react";
import { Button, Modal } from "react-bootstrap";

class DialogoConfirmacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);            
  }  

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleShow() {    
    this.setState({
      show: true,
      result: false
    });
  }

  handleConfirm = event => {
    this.handleClose();    
    this.props.handleDelete(event);
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          {this.props.titulo}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.mensagem}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleConfirm} data-id={this.props.id}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DialogoConfirmacao;
