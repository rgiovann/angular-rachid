# Rachid

Aplicacao web em Angular para calcular quanto cada pessoa deve pagar ou receber em um rateio entre amigos.

O problema que o sistema resolve e simples de entender, mas muito comum na vida real: varias pessoas participam de uma viagem, encontro ou evento, os pagamentos sao feitos por pessoas diferentes, e no final o valor total precisa ser dividido igualmente entre todos.

O objetivo do app e registrar essas informacoes, consolidar os gastos e mostrar com clareza:

- quanto foi gasto ao todo;
- quanto cada pessoa deveria pagar;
- quem ficou com saldo positivo ou negativo;
- quem deve pagar para quem.

## Demo

A aplicacao publicada pode ser acessada em:

- [GitHub Pages - Rachid](https://rgiovann.github.io/angular-rachid/)

## Status atual

Hoje o projeto ja entrega um fluxo funcional de ponta a ponta:

- cadastro de pessoas;
- cadastro de despesas com descricao, data, valor e responsavel;
- remocao de pessoas e despesas;
- exclusao em cascata das despesas quando uma pessoa e removida;
- persistencia local com `localStorage`;
- validacoes basicas de formulario;
- dialogs de confirmacao e aviso;
- calculo completo do rateio;
- exibicao do resultado consolidado em dialog dedicado;
- suporte visual refinado para telas desktop e mobile;
- testes automatizados para a regra principal do algoritmo.

## Exemplo de uso

Considere 3 pessoas:

- Antonio
- Jose
- Mario

Pagamentos realizados:

- Antonio pagou `R$ 170,00`
- Jose pagou `R$ 75,00`
- Jose pagou `R$ 25,00`

Total gasto:

- `R$ 270,00`

Valor por pessoa:

- `R$ 90,00`

Resultado esperado:

- Jose deve `R$ 23,33` para Antonio
- Mario deve `R$ 56,67` para Antonio
- Mario deve `R$ 33,33` para Jose

Esse e um dos cenarios usados para validar o algoritmo no projeto.

## Como o resultado e apresentado

Ao clicar no botao `Rateio`, o sistema:

1. consolida todas as despesas cadastradas;
2. calcula a cota igual por participante;
3. identifica o saldo individual de cada pessoa;
4. reduz os cruzamentos de debito/credito para chegar nas transferencias finais;
5. exibe um relatorio visual com:
- total das despesas;
- valor por pessoa;
- saldo de cada participante;
- linhas do tipo `DEVE ... para ...` e `RECEBE ... de ...`;
- indicacao de `Esta quite` quando nao houver movimentacoes pendentes.

## Arquitetura da feature de rateio

O projeto segue uma separacao simples e saudavel entre regra de negocio e interface:

- `src/app/rateio/rateio.service.ts`
  Calcula o rateio com base nas pessoas e despesas cadastradas.

- `src/app/rateio/rateio.model.ts`
  Define os contratos de dados usados como saida do calculo.

- `src/app/resultado-rateio/`
  Contem o componente responsavel por transformar o resultado em um relatorio visual para o usuario.

- `src/app/app.ts`
  Orquestra o clique do botao `Rateio`, chama o servico e abre o dialog de resultado.

Essa estrutura evita misturar calculo financeiro com renderizacao e facilita manutencao, testes e evolucao futura.

## Logica de calculo

O algoritmo implementado em TypeScript foi portado a partir de uma versao previamente validada em Java.

De forma resumida, ele funciona assim:

1. soma todos os pagamentos feitos;
2. calcula quanto cada pessoa deveria pagar igualmente;
3. registra, para cada despesa, quanto cada uma das outras pessoas deve ao pagador;
4. consolida relacoes reciprocas entre pares de pessoas;
5. elimina residuos numericos irrelevantes com tolerancia para ponto flutuante;
6. devolve:
- total gasto;
- valor por pessoa;
- saldos individuais;
- transferencias finais entre devedores e credores.

## Angular moderno utilizado no projeto

Este projeto aplica varias praticas atuais do ecossistema Angular:

- standalone components;
- `bootstrapApplication`;
- `signal()` no componente raiz;
- templates com `@for` e `@if`;
- formularios reativos tipados;
- integracao com Angular Material;
- `AsyncPipe`;
- pipes importados diretamente nos componentes;
- diretiva standalone customizada;
- uso de RxJS com `BehaviorSubject`, `Observable`, `combineLatest` e `map`.

## Recursos de UI/UX implementados

Ao longo da construcao, a interface passou por refinamentos importantes:

- reorganizacao do header para telas menores;
- adaptacao dos botoes principais para mobile;
- dialogs com largura fluida para evitar cortes em viewports estreitas;
- relatorio de rateio com resumo no topo e listagem por pessoa;
- destaque visual para:
  - `DEVE` em vermelho;
  - `RECEBE` em verde;
  - saldo positivo em verde;
  - saldo negativo em vermelho;
- ordenacao alfabetica das pessoas no resultado final.

## Regras de negocio ja implementadas

O projeto ja contempla varias regras importantes:

- nome da pessoa nao pode ser vazio;
- nao e permitido cadastrar duas pessoas com o mesmo nome;
- a despesa precisa ter descricao;
- o valor da despesa deve ser maior que zero;
- cada despesa precisa estar vinculada a uma pessoa;
- nao e permitido abrir o cadastro de despesa sem haver pessoas cadastradas;
- ao remover uma pessoa, as despesas associadas tambem sao removidas;
- o resultado do rateio e calculado apenas quando existem pessoas e despesas cadastradas.

## Estrutura do projeto

Organizacao principal em `src/app`:

- `header/`: cabecalho da aplicacao;
- `pessoas/`: cadastro, listagem e remocao de participantes;
- `despesas/`: cadastro, listagem e remocao de despesas;
- `rateio/`: servico, modelos e testes da logica de calculo;
- `resultado-rateio/`: componente visual do relatorio final;
- `shared/`: dialogs e diretivas reutilizaveis.

## Persistencia local

Atualmente os dados sao persistidos no navegador com `localStorage`.

Chaves utilizadas:

- `pessoas`
- `despesas`

Isso permite testar o sistema rapidamente sem depender de backend e preserva os dados entre recarregamentos da pagina.

## Localidade

O projeto foi preparado para o contexto brasileiro:

- locale `pt-BR`;
- formatacao monetaria em real;
- datas exibidas no padrao local;
- interface em portugues.

## Testes

A regra de calculo do rateio possui testes automatizados em:

- `src/app/rateio/rateio.service.spec.ts`

Atualmente existem cenarios baseados em exemplos reais previamente validados na versao Java do algoritmo.

Para executar os testes:

```bash
npm.cmd test -- --watch=false --include=src/app/rateio/rateio.service.spec.ts
```

## Como executar o projeto localmente

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Depois acesse:

```text
http://localhost:4200
```

## Scripts disponiveis

- `npm start`: inicia o servidor de desenvolvimento com `ng serve`;
- `npm run build`: gera o build de producao;
- `npm run watch`: gera build em modo desenvolvimento com watch;
- `npm test`: executa os testes configurados no projeto.

## Pontos de evolucao

Embora a feature principal de rateio ja esteja funcional, ainda existem caminhos interessantes para evolucao:

- ampliar a cobertura de testes;
- adicionar mais cenarios de validacao do algoritmo;
- melhorar ainda mais a apresentacao visual do relatorio;
- considerar persistencia remota no futuro;
- separar fluxos com roteamento, se fizer sentido para a evolucao do app.

## Valor tecnico do projeto

Mesmo sendo um sistema pequeno, o projeto reune varios aspectos relevantes de engenharia de software aplicada:

- modelagem de regra de negocio;
- port de algoritmo de Java para TypeScript;
- arquitetura por feature;
- responsividade;
- integracao com Angular Material;
- testes automatizados;
- preocupacao com legibilidade do resultado para o usuario final.

Em outras palavras, e um projeto enxuto, atual e com um problema de negocio real muito claro.
