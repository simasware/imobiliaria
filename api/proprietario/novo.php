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
    if (
        !empty($dados->nome) &&        
        !empty($dados->email) &&
        !empty($dados->telefone) &&        
        !empty($dados->dia_repasse)
    ){                
        $proprietario->nome = $dados->nome;
        $proprietario->email = $dados->email;
        $proprietario->telefone = $dados->telefone;
        $proprietario->dia_repasse = $dados->dia_repasse;
        if ($proprietario->novo()){
            http_response_code(200);
            echo json_encode(array("mensagem" => "Registro efetuado com sucesso!"));
        } else {
            http_response_code(503);
            echo json_encode(array("mensagem" => "Nao foi possivel efetuar o registro"));
        }
    } else {        
        echo json_encode(array("mensagem" => "Dados incompletos. Verifique!"));
    }    
?>