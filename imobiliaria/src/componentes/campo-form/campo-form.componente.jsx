import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const CampoForm = ({ idComp, label, tipoCampo, placeHolder, valor, handleChange, otherProps }) => (
  <Form.Group as={Row} controlId={idComp}>
    <Form.Label column sm="2">
      {label}
    </Form.Label>
    <Col sm="10">
      <Form.Control
        type={tipoCampo}
        placeholder={placeHolder}
        value={valor}
        required
        onChange={handleChange}
        {...otherProps}
      />
    </Col>
  </Form.Group>
);

export default CampoForm;