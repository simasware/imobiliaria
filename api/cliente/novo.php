<?php   
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Acces-Control-Allow-Origin: http://localhost:3000");
    
    include_once '../config/db.php';
    include_once '../classes/cliente.class.php';

    $db = new Database();
    $db = $db->conecta();
    $cliente = new Cliente($db);
    $dados = json_decode(file_get_contents("php://input"));        
    if (
        !empty($dados->nome) &&
        !empty($dados->email) &&
        !empty($dados->endereco)
    ){
        $cliente->nome = $dados->nome;
        $cliente->endereco = $dados->endereco;
        $cliente->email = $dados->email;
        if ($cliente->novo()){
            http_response_code(200);
            echo json_encode(array("mensagem" => "Registro efetuado com sucesso!"));
        } else {
            http_response_code(503);
            echo json_encode(array("mensagem" => "Nao foi possivel efetuar o registro"));
        }
    } else {        
        http_response_code(400);
        echo json_encode(array("mensagem" => "Dados incompletos. Verifique!"));
    }

?>