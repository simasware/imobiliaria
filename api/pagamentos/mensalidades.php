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
    $pagamento->contrato_id = $condicoes->id;
    $qry = $pagamento->lista_mensalidades();
    $numRegistros = $qry->rowCount();

    if ($numRegistros > 0) {
        $mensalidades = array();
        $mensalidades["registros"] = array();

        while ($linha = $qry->fetch(PDO::FETCH_ASSOC)){
            extract($linha);
            $mensalidade_item = array(
                "id" => $id,                                          
                "contrato_id" => $contrato_id,                        
                "data_vencimento" => $data_vencimento,                
                "valor" => $valor,                                    
                "recebido" => $recebido      
            );
            array_push($mensalidades["registros"], $mensalidade_item);
        }
        http_response_code(200);
        echo json_encode($mensalidades);
    } else {
        
        echo json_encode(array("mensagem" => "Nenhum registro encontrado."));
    }
?>