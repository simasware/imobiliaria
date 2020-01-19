<?php    
    require_once 'base.class.php';
    
    class Proprietario extends Base {
        public $id;
        public $nome;        
        public $email;
        public $telefone;
        public $dia_repasse;
        protected $tabela;

        public function __construct($db){            
            parent::__construct($db);                                
            $this->tabela = "proprietario";
        }

        private function sanitiza(){
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->nome = htmlspecialchars(strip_tags($this->nome));
            $this->email = htmlspecialchars(strip_tags($this->email));                        
            $this->telefone = htmlspecialchars(strip_tags($this->telefone));                        
            $this->dia_repasse = htmlspecialchars(strip_tags($this->dia_repasse));                        
        }

        

        function novo(){
            $sql = "insert into ". $this->tabela . "  (nome, email, telefone, dia_repasse) values (:nome, :email, :telefone, :dia_repasse)";
            $resultado = $this->conexao->prepare($sql);

            $this->sanitiza();

            $resultado->bindParam(":nome", $this->nome);
            $resultado->bindParam(":email", $this->email);
            $resultado->bindParam(":telefone", $this->telefone);
            $resultado->bindParam(":dia_repasse", $this->dia_repasse);

            if ($resultado->execute()){
                return true;
            }

            return false;
        }

        function atualiza(){
            $sql = "update ". $this->tabela . "  set nome = :nome, email = :email, telefone = :telefone, dia_repasse = :dia_repasse where id = :id";
            $resultado = $this->conexao->prepare($sql);
            $this->sanitiza();
            $resultado->bindParam(":id", $this->id);
            $resultado->bindParam(":nome", $this->nome);
            $resultado->bindParam(":telefone", $this->telefone);
            $resultado->bindParam(":dia_repasse", $this->dia_repasse);
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