## Como rodar o projeto

Siga as instruções abaixo para configurar e executar o ambiente de desenvolvimento.

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/) (Versão 18 ou superior)
* [Java JDK](https://www.oracle.com/java/technologies/downloads/) (Versão 17 ou 21, conforme seu projeto)

### Rodando o Backend (API)

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Joaremio/nome-do-seu-repo.git](https://github.com/Joaremio/nome-do-seu-repo.git)

2. Acesse a pasta do backend:
   ```bash
   cd nome-do-seu-repo/backend

Antes de rodar o projeto, você precisa configurar as variáveis de ambiente e as chaves de segurança.

3. **Banco de Dados:**
   Crie um banco de dados PostgreSQL com o nome `comicboxd`.
   
4. **Configuração do Properties:**
    Navegue até src/main/resources, duplique o arquivo application.properties.example e renomeie para application.properties.
   
4. Edite o arquivo e coloque a senha do seu banco local em spring.datasource.password.

5. **Rodando a aplicação:**
    Volte para a raiz do backend e execute:
     ```./mvnw spring-boot:run
     

