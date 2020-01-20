<?php
    include_once "base.class.php";

    class Pagamento extends Base {
        public $contrato_id;

        public function __construct($db){            
            parent::__construct($db);        
            $this->contrato_id = 11;                        
        }

        function lista_mensalidades(){
            $sql = "select * from mensalidade where contrato_id = :contrato_id";
            $resultado = $this->conexao->prepare($sql);
            $resultado->bindParam(":contrato_id", $this->contrato_id);
            $resultado->execute();
            return $resultado;  
        }

        function lista_repasses(){
            $sql = "select * from repasse where contrato_id = :contrato_id";
            $resultado = $this->conexao->prepare($sql);
            $resultado->bindParam(":contrato_id", $this->contrato_id);
            $resultado->execute();
            return $resultado;  
        }

        function baixa_mensalidade($id_mensalidade){
            $sql = "update mensalidade set recebido = 1 where id = :id_mensalidade";
            $resultado = $this->conexao->prepare($sql);
            $resultado->bindParam(":id_mensalidade", $id_mensalidade);
            if ($resultado->execute()){
                return true;
            }

            return false;
        }

        function baixa_repasse($id_repasse){
            $sql = "update repasse set repassado = 1 where id = :id_repasse";
            $resultado = $this->conexao->prepare($sql);
            $resultado->bindParam(":id_repasse", $id_repasse);
            if ($resultado->execute()){
                return true;
            }

            return false;
        }

    }
?>