import React from "react";
import { Table, Button } from "react-bootstrap";

function Datatable({ cabecalho, dados, acoes }) {
  let tbody = dados.map(p => {
    return (
      <tr key={p.id}>
        {Object.keys(p).map(k => {
          return <td key={p.id}>{p[k]}</td>;
        })}
      </tr>
    );
  });
  let theader = cabecalho.map(titulo => {
    return <td>{titulo}</td>;
  });  
  return (
    <Table>
      <thead>{theader}</thead>
      <tbody>{tbody}</tbody>
    </Table>
  );
}

export default Datatable;
