<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Acces-Control-Allow-Origin: http://localhost:3000");

    include_once '../config/db.php';
    include_once '../classes/contrato.class.php';

    $db = new Database();
    $db = $db->conecta();    
    $contrato = new Contrato($db);

    $condicoes = json_decode(file_get_contents("php://input"));
    if (isset($condicoes->campo) && isset($condicoes->valor) && isset($condicoes->exata)){ 
        $qry = $contrato->consultar($condicoes->campo, $condicoes->valor, $condicoes->exata);
        $numRegistros = $qry->rowCount();

        if ($numRegistros > 0) {
            $contratos = array();
            $contratos["registros"] = array();

            while ($linha = $qry->fetch(PDO::FETCH_ASSOC)){
                extract($linha);
                $contrato_item = array(
                    "id" => $id,
                    "proprietario_id" => $proprietario_id,
                    "cliente_id" => $cliente_id,
                    "imovel_id" => $imovel_id,
                    "data_inicio" => $data_inicio,
                    "data_final" => $data_final,
                    "taxa_administracao" => $taxa_administracao,
                    "valor_aluguel" => $valor_aluguel,
                    "valor_condominio" => $valor_condominio,
                    "valor_iptu" => $valor_iptu,
                    "nome_proprietario" => $nome_proprietario,
                    "nome_cliente" => $nome_cliente,
                    "endereco" => $endereco
                );
                array_push($contratos["registros"], $contrato_item);
            }
            http_response_code(200);            
            echo json_encode($contratos);
        } else {
            http_response_code(404);
            echo json_encode(array("mensagem" => "Nenhum registro encontrado."));
        }
    } else {
        
        echo json_encode(array("mensagem" => "Consulta mal formada"));
    }
?>