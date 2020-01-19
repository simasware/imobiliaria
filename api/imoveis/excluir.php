<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/db.php';
    include_once '../classes/imovel.class.php';

    $db = new Database();
    $db = $db->conecta();
    $imovel = new Imovel($db);
    $dados = json_decode(file_get_contents("php://input"));    
    $imovel->id = $dados->id;    
    
    if ($imovel->exclui()){
        http_response_code(200);
        echo json_encode(array("mensagem" => "Registro excluido com sucesso!"));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível excluir o Registro"));
    }
?>