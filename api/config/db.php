<?php  

    class Database {
        private $host = "localhost";
        private $banco = "desafio";
        private $usuario = "root";
        private $senha = "";
        public $conexao;

        public function conecta(){
            $this->conexao = null;

            try {
                $this->conexao = new PDO("mysql:host=" .
                    $this->host . ";dbname=" . $this->banco,
                    $this->usuario, $this->senha);
                $this->conexao->exec("set names utf8");            
            }catch (PDOException $exception) {
                echo "Falha ao conectar." . $exception->getMessage();
            }
            return $this->conexao;
        }                
}