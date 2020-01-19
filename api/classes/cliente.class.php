<?php    
    require_once 'base.class.php';
    
    class Cliente extends Base {
        public $id;
        public $nome;
        public $endereco;
        public $email;        

        public function __construct($db){            
            parent::__construct($db);                                
            $this->tabela = "cliente";
        }

        private function sanitiza(){
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->nome = htmlspecialchars(strip_tags($this->nome));
            $this->endereco = htmlspecialchars(strip_tags($this->endereco));                        
            $this->email = htmlspecialchars(strip_tags($this->email));                        
        }        

        function novo(){
            $sql = "insert into ". $this->tabela . " (nome, endereco, email) values (:nome, :endereco, :email)";
            $resultado = $this->conexao->prepare($sql);

            $this->sanitiza();

            $resultado->bindParam(":nome", $this->nome);
            $resultado->bindParam(":endereco", $this->endereco);
            $resultado->bindParam(":email", $this->email);

            if ($resultado->execute()){
                return true;
            }

            return false;
        }

        function atualiza(){
            $sql = "update ". $this->tabela . " set nome = :nome, endereco = :endereco, email = :email where id = :id";
            $resultado = $this->conexao->prepare($sql);
            $this->sanitiza();
            $resultado->bindParam(":id", $this->id);
            $resultado->bindParam(":nome", $this->nome);
            $resultado->bindParam(":endereco", $this->endereco);
            $resultado->bindParam(":email", $this->email);
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
    }
?>