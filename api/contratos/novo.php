<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/db.php';
    include_once '../classes/contrato.class.php';

    $db = new Database();
    $db = $db->conecta();
    $contrato = new Contrato($db);
    $dados = json_decode(file_get_contents("php://input"));    
    if (
        !empty($dados->nome) &&        
        !empty($dados->email) &&
        !empty($dados->telefone) &&        
        !empty($dados->dia_repasse)
    ){                                
        $contrato->cliente_id = $dados->cliente_id;                          
        $contrato->imovel_id = $dados->imovel_id;                            
        $contrato->data_inicio = $dados->data_inicio;                        
        $contrato->data_final = $dados->data_final;                          
        $contrato->taxa_administracao = $dados->taxa_administracao;          
        $contrato->valor_aluguel = $dados->valor_aluguel;                    
        $contrato->valor_condominio = $dados->valor_condominio;              
        $contrato->valor_iptu = $dados->valor_iptu;                          
        if ($contrato->novo()){
            http_response_code(201);
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