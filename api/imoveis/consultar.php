<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/db.php';
    include_once '../classes/imovel.class.php';

    $db = new Database();
    $db = $db->conecta();    
    $imovel = new Imovel($db);

    $condicoes = json_decode(file_get_contents("php://input"));
    if (isset($condicoes->campo) && isset($condicoes->valor) && isset($condicoes->exata)){ 
        $qry = $imovel->consulta($condicoes->campo, $condicoes->valor, $condicoes->exata);
        $numRegistros = $qry->rowCount();

        if ($numRegistros > 0) {
            $imoveis = array();
            $imoveis["registros"] = array();

            while ($linha = $qry->fetch(PDO::FETCH_ASSOC)){
                extract($linha);
                $imovel_item = array(
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
                array_push($imoveis["registros"], $imovel_item);
            }
            http_response_code(200);            
            echo json_encode($imoveis);
        } else {
            http_response_code(404);
            echo json_encode(array("mensagem" => "Nenhum registro encontrado."));
        }
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Consulta mal formada"));
    }
?>