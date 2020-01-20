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
    $dados = json_decode(file_get_contents("php://input"));    
    if (
        !empty($dados->proprietario_id) &&        
        !empty($dados->endereco)
    ){        
        $imovel->endereco = $dados->endereco;
        $imovel->proprietario_id = $dados->proprietario_id;
        if ($imovel->novo()){
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