## Instruções
* Para a instalação das dependencias do projeto, execute:
```
npm install
```

* Para a execução dos testes automatizados do projeto, execute:
```
npm test
```
Essa execução de testes gera um relatório de coverage, que demonstra graficamente a cobertura de código atingida pelos testes.

* Para gerar uma pasta "dist" com o conteúdo publicavel do sistema, execute:
```
npm build
```

* Para executar a api, execute:
```
npm start
```

* Pode-se gerar uma imagem docker com a execução do seguinte comando:
```
docker build  .
```
* que pode ser executada com:
```
docker run -p 3001:3001 -d :imageId
```
As configurações do sistema estão concentradas em um arquivo `config.json`, na pasta `conf`. São gerenciadas pelo pacote `nconf`, uma das dependencias do programa.

## Dependencias
O `Express` foi utilizado para viabilizar a exposição de endpoints e rotas. O `body-parser` auxilia no parseamento das entradas e saidas de JSON <=> TEXT.

O `morgan` é utilizado para simplificar a forma com que as requisições são representadas nos Logs da aplicação.

Como já mencionado, o `nconf` é utilizado para centralizar e genrenciar as configurações do serviço.

`node-json-db` é a lib que viabiliza a inclusão do banco de dados interno da aplicação.

As libs `winston` e `winston-daily-rotate-file` são responsáveis pelos logs.

### Dependencias de Desenvolvimento
O `Striker` é utilizado como ferramenta de execução de testes de mutação (Falta ajustes na utilização [TECH DEBT])

O `Chai` auxilia nos asserts dos testes. O `Mocha `é o framework de tests utilizado, funcionando também como test runner. Nesse escopo, o `supertest` é responsável por executar reuests HTTP nos testes de integração; e o `Rewire` faz a sobrescrita de dependencias para facilitar testes unitarios.

O `istanbul` gera ótimos relatórios de cobertura de testes.

As libs `jshint` são responsáveis pela análise estática do código.
