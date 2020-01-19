<?php        
    class Base {
        protected $conexao;           
        protected $tabela;          
        
        public function __construct($db) {            
            $this->conexao = $db;                                    
        }                        

        function listar(){            
            $sql = "select * from " . $this->tabela . " order by id asc";                                                
            $resultado = $this->conexao->prepare($sql);
            $resultado->execute();
            return $resultado;            
        }

        function consulta($campo, $valor, $exata){            
            $sql = "SELECT * FROM ". $this->tabela;            
            if ($exata === '1'){                
                $sql .= " where " . $campo . " = :valor";                                    
            } else {                
                $sql .= " where " . $campo . " like :valor";                                    
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