<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Acces-Control-Allow-Origin: http://localhost:3000");   

    include_once '../config/db.php';
    include_once '../classes/pagamento.class.php';

    $db = new Database();
    $db = $db->conecta();    
    $pagamento = new Pagamento($db);
    $condicoes = json_decode(file_get_contents("php://input"));

    if ($condicoes->id_contrato > 0) {
        $pagamento->contrato_id = $condicoes->id_contrato;        
        if ($pagamento->baixa_repasse($condicoes->id_repasse)){
            http_response_code(200);
            echo json_encode(array("mensagem" => "Registro efetuado com sucesso."));
        } else {
            http_response_code(503);
            echo json_encode(array("mensagem"=> "Falha ao registrar."));
        }
        
    } else {
        echo json_encode(array("mensagem" => "Consulta mal formada."));
    }
?>