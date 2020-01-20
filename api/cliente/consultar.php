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
    
    $condicoes = json_decode(file_get_contents("php://input"));    
    if (isset($condicoes->campo) && isset($condicoes->valor) && isset($condicoes->exata)){ 
        $qry = $cliente->consulta($condicoes->campo, $condicoes->valor, $condicoes->exata);
        $numRegistros = $qry->rowCount();

        if ($numRegistros > 0) {
            $clientes = array();
            $clientes["registros"] = array();

            while ($linha = $qry->fetch(PDO::FETCH_ASSOC)){
                extract($linha);
                $cliente_item = array(
                    "id" => $id,
                    "nome" => $nome,
                    "endereco" => $endereco,
                    "email" => $email
                );
                array_push($clientes["registros"], $cliente_item);
            }
            http_response_code(200);            
            echo json_encode($clientes);
        } else {
            http_response_code(404);
            echo json_encode(array("mensagem" => "Nenhum registro encontrado."));
        }
    } else {
        http_response_code(200);
        echo json_encode(array("mensagem" => "Consulta mal formada"));
    }
           
?>