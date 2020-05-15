
# Sobre o Código

Esse código foi utilizado para a criação do curso [Automação Full Stack](http://qaninja.io) da QA Ninja. Cuja natureza desse sistema é: criar, listar, atualizar e remover tarefas.

# Exemplo da Integração

![Alt text](docs/Treko.jpg?raw=true "Exemplo")

A QA Ninja é uma escola online que conta com um time de Ninjas de altíssimo nível pra oferecer o melhor conteúdo sempre focando em Tecnologias Relevantes. Ministramos treinamentos com foco na mudança do modelo mental do profissional de TI.

# Guia de Uso

## Pré-requisitos: [NPM](https://nodejs.org/en/download/package-manager), [Docker](https://docs.docker.com/engine/install) e [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials) instalados.

### MongoDB

Será utilizado nessa API o banco de dados não relacional **mongoDB**. No terminal, baixe e configure a imagem do docker do mongo executando o comando abaixo.
```
docker run --name mongo -d -p 27017:27017 mongo
```
Para mais informações sobre mongoDB, acesse o [site oficial da ferramenta](https://www.mongodb.com).

### Robo 3T

Será utilizado o gerenciador de banco de dados **Robo 3T**. A instalação desse exemplo utilizará a versão para a plataforma linux.

1. Acesse o caminho:
```
cd /usr/local/bin
```
2. Com permissões de super usuário crie e entre na pasta, a qual ficará Robo 3T:
```
sudo mkdir robomongo && cd robomongo
```
3. Baixe o Robo 3T:
```
sudo wget https://download-test.robomongo.org/linux/robo3t-1.3.1-linux-x86_64-7419c406.tar.gz
```
4. Descompacte o arquivo:
```
sudo tar -xvzf robo3t-1.3.1-linux-x86_64-7419c406.tar.gz 
```
5. Acesse o diretório, cujo executável do Robo 3T se encontra:
```
cd robo3t-1.3.1-linux-x86_64-7419c406/bin
```
6. Execute o arquivo **robo3t**:
```
./robo3t
```
7. Clique no link `Create` e digite `mongo` no campo `name`;
8. Clique no botão `Test`, caso tenha sucesso, clique no botão `Save` e em seguida `Connect`.

Para mais informações sobre Robo 3T, acesse o [site oficial da ferramenta](https://robomongo.org).

## RabbitMQ

Será utilizado o **RabbitMQ** para os serviços de mensagem usando o protocolo AMQP (_Advanced Message Queie Protocol_). No terminal, baixe e configure a imagem do docker do RabbitMQ executando o comando abaixo.
```
docker run -d --hostname rabbitmq --name rabbitmq -p 15672:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```
Verifique se o painel administrativo do RabbitMQ está disponível, acessando no navegador a url http://localhost:15672 com a credencial `guest` para os campos: `Username` e `Password`.

Para mais informações sobre RabbitMQ, acesse o [site oficial da ferramenta](https://www.rabbitmq.com).

## Instalando Pacotes e Dependências do Projeto

No terminal, dentro do diretório do projeto **automation-treko-api**, entre na pasta `api`:
```
cd api
```
E instale as dependências do arquivo `package.json` executando: `npm install`;

Em seguida instale o framework de testes [Mocha](https://mochajs.org), o qual é executado em Node.js:
```
npm install mocha --save-dev
```
Instale também a biblioteca [Chai](https://www.chaijs.com), a qual será utilizada para realizar asserções nos testes:
```
npm install chai --save-dev
```
Por fim, instale o plugin [Chai-HTTP](https://www.chaijs.com/plugins/chai-http), o qual será útil para realizar verificações HTTP ou serviços externos:
```
npm install chai-http --save-dev
```
