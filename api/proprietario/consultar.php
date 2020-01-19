<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Acces-Control-Allow-Origin: http://localhost:3000");

    include_once '../config/db.php';
    include_once '../classes/proprietario.class.php';

    $db = new Database();
    $db = $db->conecta();    
    $proprietario = new Proprietario($db);

    $condicoes = json_decode(file_get_contents("php://input"));
    if (isset($condicoes->campo) && isset($condicoes->valor) && isset($condicoes->exata)){ 
        $qry = $proprietario->consulta($condicoes->campo, $condicoes->valor, $condicoes->exata);
        $numRegistros = $qry->rowCount();

        if ($numRegistros > 0) {
            $proprietarios = array();
            $proprietarios["registros"] = array();

            while ($linha = $qry->fetch(PDO::FETCH_ASSOC)){
                extract($linha);
                $proprietario_item = array(
                    "id" => $id,                    
                    "nome" => $nome,
                    "email" => $email,
                    "telefone" => $telefone,
                    "dia_repasse" => $dia_repasse
                );
                array_push($proprietarios["registros"], $proprietario_item);
            }
            http_response_code(200);            
            echo json_encode($proprietarios);
        } else {
            http_response_code(404);
            echo json_encode(array("mensagem" => "Nenhum registro encontrado."));
        }
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Consulta mal formada"));
    }
?>