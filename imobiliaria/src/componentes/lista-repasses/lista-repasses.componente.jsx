import React from "react";
import {Table, Row, Col, Button, Container} from "react-bootstrap";
import DialogConfirmacao from "../dialogo-confirmacao/dialogo-confirmacao.componente";

const ListaRepasses = ({dados, handleSubmit}) => (
    <Table>
            <thead>
              <tr>
                <td>Valor</td>
                <td>Mês Referência</td>
                <td>Situacao</td>                
                <td></td>
              </tr>
            </thead>
            <tbody>
              {dados.map(repasse => {
                return (
                  <tr key={repasse.id}>                                                
                    <td>
                      {parseFloat(repasse.valor).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL"
                        }
                      )}
                    </td>
                    <td>{repasse.mes_referencia}</td>
                    <td>{ repasse.repassado === "1" ? "Repassado" : "A Repassar"}</td>
                    <td>
                    { repasse.repassado === "0" ? (
                      <Container>
                        <Row>                                                    
                          <Col xs lg="3">
                            <DialogConfirmacao
                              titulo="Receber"
                              mensagem="Confirmar o repasse"
                              handleDelete={handleSubmit}
                              id={repasse.id}
                            />
                            
                          </Col>                          
                        </Row>
                      </Container>
                      ): ("")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
);

export default ListaRepasses;