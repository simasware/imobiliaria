<?php    
    require_once 'base.class.php';
    
    class Imovel extends Base {
        public $id;        
        public $endereco;
        public $proprietario_id;

        public function __construct($db){            
            parent::__construct($db);    
            $this->tabela = "imovel";
        }

        private function sanitiza(){
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->nome = htmlspecialchars(strip_tags($this->proprietario_id));
            $this->endereco = htmlspecialchars(strip_tags($this->endereco));                        
        }
                
        function listar(){
            $sql = "SELECT im.*, pr.nome AS nome_proprietario FROM ". $this->tabela . "  im JOIN proprietario pr ON (pr.id = im.proprietario_id)";                                    
            $resultado = $this->conexao->prepare($sql);
            $resultado->execute();
            return $resultado;            
        }

        function novo(){
            $sql = "insert into ". $this->tabela . "  (endereco, proprietario_id) values (:endereco, :proprietario_id)";
            $resultado = $this->conexao->prepare($sql);

            $this->sanitiza();

            $resultado->bindParam(":proprietario_id", $this->nome);
            $resultado->bindParam(":endereco", $this->endereco);            

            if ($resultado->execute()){
                return true;
            }

            return false;
        }

        function atualiza(){
            $sql = "update ". $this->tabela . " set endereco = :endereco, proprietario_id = :proprietario_id where id = :id";
            $resultado = $this->conexao->prepare($sql);
            $this->sanitiza();
            $resultado->bindParam(":id", $this->id);            
            $resultado->bindParam(":endereco", $this->endereco);
            $resultado->bindParam(":proprietario_id", $this->proprietario_id);
            if ($resultado->execute()){
                return true;
            }

            return false;
        }

        function exclui(){
            $sql = "delete from ". $this->tabela . "  where id = :id";
            $resultado = $this->conexao->prepare($sql);
            $this->sanitiza();
            $resultado->bindParam(":id", $this->id);            
            if ($resultado->execute()){
                return true;
            }

            return false;
        }

        function consulta($campo, $valor, $exata){            
            $sql = "SELECT im.*, pr.nome AS nome_proprietario FROM ". $this->tabela . "  im JOIN proprietario pr ON (pr.id = im.proprietario_id)";
            if ($exata === "1"){                
                $sql .= " where im." . $campo . " = :valor";                                    
            } else {                
                $sql .= " where im." . $campo . " like :valor";                                    
            }            
            $resultado = $this->conexao->prepare($sql);            
            $valor = htmlspecialchars(strip_tags($valor));
            if ($exata !== "1"){
                $valor = "%{$valor}%";
            }            
            $resultado->bindParam(":valor", $valor);               
            $resultado->execute();
            
            return $resultado;            
        }        
    }
?>