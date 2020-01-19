<?php    
    require_once 'base.class.php';
    
    class Contrato extends Base {
        public $id;                           
        public $proprietario_id;              
        public $cliente_id;                   
        public $imovel_id;                    
        public $data_inicio;                  
        public $data_final;                   
        public $taxa_administracao;           
        public $valor_aluguel;                
        public $valor_condominio;             
        public $valor_iptu;                   
        protected $tabela;

        public function __construct($db){            
            parent::__construct($db);                                
            $this->tabela = "contrato";
        }

        private function sanitiza(){
            $this->id = htmlspecialchars(strip_tags($this->id));                                          
            $this->proprietario_id = htmlspecialchars(strip_tags($this->proprietario_id));                
            $this->cliente_id = htmlspecialchars(strip_tags($this->cliente_id));                          
            $this->imovel_id = htmlspecialchars(strip_tags($this->imovel_id));                            
            $this->data_inicio = htmlspecialchars(strip_tags($this->data_inicio));                        
            $this->data_final = htmlspecialchars(strip_tags($this->data_final));                          
            $this->taxa_administracao = htmlspecialchars(strip_tags($this->taxa_administracao));          
            $this->valor_aluguel = htmlspecialchars(strip_tags($this->valor_aluguel));                    
            $this->valor_condominio = htmlspecialchars(strip_tags($this->valor_condominio));              
            $this->valor_iptu = htmlspecialchars(strip_tags($this->valor_iptu));  
        }        

        function novo(){
            $sql = "insert into ". $this->tabela . "
                        (id,proprietario_id,cliente_id,imovel_id,data_inicio,data_final,taxa_administracao,valor_aluguel,
                        valor_condominio,valor_iptu) values (:id,:proprietario_id,:cliente_id,:imovel_id,:data_inicio,:data_final,
                        :taxa_administracao,:valor_aluguel,:valor_condominio,:valor_iptu)";
            $resultado = $this->conexao->prepare($sql);

            $this->sanitiza();

            $resultado->bindParam(":proprietario_id", $this->proprietario_id);                
            $resultado->bindParam(":cliente_id", $this->cliente_id);                          
            $resultado->bindParam(":imovel_id", $this->imovel_id);                            
            $resultado->bindParam(":data_inicio", $this->data_inicio);                        
            $resultado->bindParam(":data_final", $this->data_final);                          
            $resultado->bindParam(":taxa_administracao", $this->taxa_administracao);          
            $resultado->bindParam(":valor_aluguel", $this->valor_aluguel);                    
            $resultado->bindParam(":valor_condominio", $this->valor_condominio);              
            $resultado->bindParam(":valor_iptu", $this->valor_iptu); 

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
            $resultado->bindParam(":proprietario_id", $this->proprietario_id);                
            $resultado->bindParam(":cliente_id", $this->cliente_id);                          
            $resultado->bindParam(":imovel_id", $this->imovel_id);                            
            $resultado->bindParam(":data_inicio", $this->data_inicio);                        
            $resultado->bindParam(":data_final", $this->data_final);                          
            $resultado->bindParam(":taxa_administracao", $this->taxa_administracao);          
            $resultado->bindParam(":valor_aluguel", $this->valor_aluguel);                    
            $resultado->bindParam(":valor_condominio", $this->valor_condominio);              
            $resultado->bindParam(":valor_iptu", $this->valor_iptu); 
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

        function listar(){
            $sql = "SELECT
                        ct.*,	
                        pp.nome AS nome_proprietario,	
                        cl.nome AS nome_cliente,	
                        im.endereco
                    FROM
                        contrato ct JOIN
                        proprietario pp ON (pp.id = ct.proprietario_id) JOIN
                        cliente cl ON (cl.id = ct.cliente_id) JOIN
                        imovel im ON (im.id = ct.imovel_id)";            
            $resultado = $this->conexao->prepare($sql);                        
            $resultado->execute();

            return $resultado;

        }
        
    }
?>