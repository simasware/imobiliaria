<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Acces-Control-Allow-Origin: http://localhost:3000");   

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
                    "endereco" => $endereco,
                    "nome_proprietario" => $nome_proprietario
                );
                array_push($imoveis["registros"], $imovel_item);
            }
            http_response_code(200);            
            echo json_encode($imoveis);
        } else {
            http_response_code(200);
            echo json_encode(array("mensagem" => "Nenhum registro encontrado."));
        }
    } else {
        http_response_code(200);
        echo json_encode(array("mensagem" => "Consulta mal formada"));
    }
?>