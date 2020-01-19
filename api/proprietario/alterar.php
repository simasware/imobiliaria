<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/db.php';
    include_once '../classes/proprietario.class.php';

    $db = new Database();
    $db = $db->conecta();
    $proprietario = new Proprietario($db);
    $dados = json_decode(file_get_contents("php://input"));    
    $proprietario->id = $dados->id;    
    $proprietario->nome = $dados->nome;
    $proprietario->email = $dados->email;
    $proprietario->telefone = $dados->telefone;
    $proprietario->dia_repasse = $dados->dia_repasse;
    
    
    if ($proprietario->atualiza()){
        http_response_code(200);
        echo json_encode(array("mensagem" => "Registro atualizado com sucesso!"));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível atualizar o registro"));
    }
?>