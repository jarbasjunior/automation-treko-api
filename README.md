
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
Para gerar relatórios tanto no formato `html`, quanto `json` será utilizada a biblioteca [mochawesome](https://www.npmjs.com/package/mochawesome)
```
npm install --save-dev mochawesome
```

Por fim, instale o plugin [Chai-HTTP](https://www.chaijs.com/plugins/chai-http), o qual será útil para realizar verificações HTTP ou serviços externos:
```
npm install chai-http --save-dev
```
## Configurando ambiente para uso no Jenkins

Caso já tenha configurado os dockers do Mongo e Rabbitmq nas seções anteriores, remova-os com o comando abaixo:
```
docker rmi -f mongo ; docker container rm -f mongo ; docker container rm -f rabbitmq
```
Confira se as imagens do Mongo e do Rabbitmq já não são mais listadas no comando: `docker ps -a`;

Confira se os containers do Mongo e do Rabbitmq já não são mais listados no comando: `docker container ls -a`;

Agora crie a rede **skynet**, a qual ficará todo o ambiente de CI.
```
docker network create --driver bridge skynet
```
Baixe a imagem do mongo e configure-a dentro da rede **skynet** com o comando abaixo;
```
docker run --name mongo --network=skynet -d -p 27017:27017 mongo
```
Baixe a imagem do rabbitmq e configure-a dentro da rede **skynet** com o comando abaixo;
```
docker run -d --hostname rabbitmq --name rabbitmq --network=skynet -p 15672:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```
Crie `alias` em `/etc/hosts` no seu pc, para ter acesso tanto pela máquina local, quanto pelo jenkins ao mongo e ao rabbitmq;
```
sudo nano /etc/hosts
```
Insira os comandos abaixo:
```
127.0.0.1       mongo
127.0.0.1       jenkins
127.0.0.1       rabbitmq
```
Salve o arquivo `hosts`, feche-o e dê um ping nas rotas: `ping mongo`, `ping rabbitmq` e `ping jenkins` em qualquer uma delas deve conter na resposta:
```
from localhost (127.0.0.1):
```
Altere os IPS no código da API pelos Alias 

  - Em `app.js` substitua: `mongoose.connect('mongodb://127.0.0.1/trekodb', { useNewUrlParser: true });` por:
  ```
  mongoose.connect('mongodb://mongo:27017/trekodb', { useNewUrlParser: true });
  ```

  - Em `mqservice.js` substitua: `const CONN_URL = 'amqp://localhost:5672';` por:
  ```
  const CONN_URL = 'amqp://rabbitmq:5672';
  ```

  - Em `dropdb.sh` substitua: `mongo --host localhost:27017 trekodb --eval "db.tasks.drop()"` por:
  ```
  mongo --host mongo:27017 trekodb --eval "db.tasks.drop()"
  ```

  - Em `dropdb.bat` substitua: `mongo --host localhost:27017 trekodb --eval "db.tasks.drop()"` por:
  ```
  mongo --host mongo:27017 trekodb --eval "db.tasks.drop()"
  ```
### Configurando o Jenkins no Docker

  - Baixe a image do **jenkinsci/blueocean**
  ```
  docker pull jenkinsci/blueocean
  ```
  - Verique o download com: `docker images` e crie um volume, o qual irá persistir os dados do Jenkins
  ```
  docker volume create jenkins-data
  ```
  - Crie o container do Jenkins dentro da rede: **skynet**, com o volume: **jenkins-data** e o nome: **jenkins-blueocean**
  ```
  docker container run --name jenkins-blueocean --detach \
  --network skynet -u root \
  --volume jenkins-data:/var/jenkins_home \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --publish 8080:8080 --publish 50000:50000 jenkinsci/blueocean
  ```
  - Verique a configuração realizada acessando seu nevagador a partir da url: http://localhost:8080, você deve ver a imagem abaixo:

    <img src="https://code-maze.com/wp-content/uploads/2018/07/JenkinsScreen1.png" width="700" height="500">

  - Execute o comando: `docker exec -it jenkins-blueocean bash`, depois execute: `cat /var/jenkins_home/secrets/initialAdminPassword`. Você deverá ver uma saída similar a essa:
  ```
  ~ docker exec -it jenkins-blueocean bash
  bash-4.4# cat /var/jenkins_home/secrets/initialAdminPassword
  f281a2e3abdd4f9b892a2e982b7f3334
  ```
  - Copie o password gerado em seu terminal, cole no campo `Administrator password`, em: http://localhost:8080, e clique no botão `Continue`;

  - Na página `Customize Jenkins`, clique no card `Install suggested plugins`, para o Jenkins baixar todos plugins básicos;

    <img src="https://assets.digitalocean.com/articles/jenkins-install-ubuntu-1804/customize_jenkins_screen_two.png" width="700" height="500">

  - Crie seu `First Admin User`, neste exemplo será utilizado `devops` para os campos: Username, Password, Full name, o e-mail pode ser qualquer um de sua preferência. Depois, clique no botão `Save and Continued`;

    <img src="https://assets.digitalocean.com/articles/jenkins-install-ubuntu-1804/jenkins_create_user.png" width="700" height="500">

  - Verifique o campo `Jenkins url` (http://localhost:8080), clique no botão `Save and Finished`, em seguida `Start using Jenkins` e a configuração local do Jenkins será concluída.

    <img src="https://assets.digitalocean.com/articles/jenkins-install-ubuntu-1804/jenkins_ready_page_two.png" width="700" height="500">