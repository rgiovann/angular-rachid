# Rachid

Aplicacao web em Angular para calcular quanto cada pessoa deve pagar ou receber em um rateio entre amigos.

O cenario que o sistema resolve e o seguinte: ao longo de uma viagem, encontro ou evento, os pagamentos nao sao feitos pela mesma pessoa. Mesmo assim, no fim, o valor total precisa ser dividido igualmente entre todos os participantes. O objetivo do app e organizar essas informacoes e facilitar o acerto entre as partes.

Este projeto esta em desenvolvimento (`work in progress`) e ja possui uma base moderna em Angular, com interface em Angular Material, persistencia local e fluxo reativo para cadastro e consolidacao dos dados.

## Objetivo do sistema

O sistema foi pensado para registrar:

- as pessoas que participam do rateio;
- as despesas pagas ao longo do periodo;
- quem pagou cada despesa;
- o valor total desembolsado por cada participante;
- o saldo final necessario para equilibrar a divisao em partes iguais.

Exemplo simples:

1. Ana, Bruno e Carla participam de uma viagem.
2. Ana paga `R$ 90`, Bruno paga `R$ 30` e Carla nao paga nada.
3. O total gasto e `R$ 120`.
4. Como sao 3 pessoas, cada uma deveria arcar com `R$ 40`.
5. Resultado:
- Ana pagou `R$ 50` a mais.
- Bruno pagou `R$ 10` a menos.
- Carla pagou `R$ 40` a menos.

A partir disso, o sistema pode indicar quem deve receber e quem precisa complementar o valor para que o rateio fique justo.

## Status atual

No estado atual, o projeto ja oferece:

- cadastro de pessoas;
- cadastro de despesas com descricao, data, valor e responsavel;
- remocao de pessoas e despesas;
- exclusao em cascata das despesas quando uma pessoa e removida;
- armazenamento local no navegador com `localStorage`;
- validacoes basicas de formulario;
- dialogs de confirmacao e aviso;
- base pronta para exibir o resultado do rateio em uma etapa seguinte.

As telas de `Rateio` e `ResultadoRateio` ja existem como estrutura inicial, mas a logica final de conciliacao ainda esta em evolucao.

## Angular moderno utilizado neste projeto

Este projeto ja aplica varias praticas e APIs modernas do ecossistema Angular:

### 1. Standalone Components

A aplicacao foi montada sem `NgModules` tradicionais para os componentes da interface.

Exemplos no projeto:

- `App`
- `Header`
- `Pessoas`
- `Despesas`
- `NovaPessoa`
- `NovaDespesa`
- `DialogConfirmacao`
- `DialogAviso`

Beneficios:

- menor boilerplate;
- imports mais explicitos por componente;
- estrutura mais simples para evoluir e manter;
- alinhamento com o modelo recomendado nas versoes mais recentes do Angular.

### 2. Bootstrap moderno com `bootstrapApplication`

O ponto de entrada usa `bootstrapApplication` em vez do modelo classico baseado em `AppModule`.

Isso deixa a inicializacao mais enxuta e combina com a abordagem standalone da aplicacao.

Tambem sao configurados no bootstrap:

- `LOCALE_ID` com `pt-BR`;
- `registerLocaleData` para formatacao localizada;
- `provideNativeDateAdapter()` para integrar o datepicker do Angular Material.

### 3. Estrutura pronta para configuracao moderna de providers

O projeto ja possui um arquivo `ApplicationConfig` com preparacao para providers globais, incluindo:

- `provideRouter(routes)`;
- `provideBrowserGlobalErrorListeners()`.

No estado atual, o bootstrap principal ainda registra providers diretamente na inicializacao da aplicacao, mas a base para evoluir essa configuracao de forma centralizada ja existe no codigo.

### 4. Novo controle de fluxo no template com `@for`

As listas de pessoas e despesas usam a sintaxe moderna de templates do Angular:

- `@for (...; track ...)`

Isso substitui a abordagem antiga com `*ngFor` e deixa o template mais consistente com a nova geracao do framework.

Beneficios:

- sintaxe mais moderna e legivel;
- melhor controle de rastreamento com `track`;
- alinhamento com os recursos recentes da template syntax do Angular.

### 5. Forms reativos com tipagem

Os dialogs de cadastro usam `ReactiveFormsModule` com `FormControl` e `FormGroup`.

Exemplos presentes:

- validacao de campo obrigatorio;
- validacao de valor minimo;
- `nonNullable` em campos textuais;
- `markAsTouched()` e `markAllAsTouched()` para feedback de erro;
- leitura tipada com `getRawValue()`.

Isso melhora a previsibilidade da logica de formulario e reduz erros em tempo de desenvolvimento.

### 6. Integracao com Angular Material

O projeto usa Angular Material como base da experiencia visual e dos componentes interativos.

Componentes utilizados:

- `MatCard`
- `MatButton`
- `MatIcon`
- `MatDialog`
- `MatFormField`
- `MatInput`
- `MatDatepicker`
- `MatSelect`
- `MatToolbar`

Com isso, a aplicacao ganha:

- padronizacao visual;
- acessibilidade melhor que componentes feitos do zero;
- produtividade maior na construcao das telas;
- uma base pronta para evoluir a UX sem reinventar componentes estruturais.

### 7. Fluxo reativo com RxJS

Os dados principais do sistema sao mantidos de forma reativa usando:

- `BehaviorSubject`
- `Observable`
- `combineLatest`
- `map`

Como isso aparece no projeto:

- `PessoasService` expoe `pessoas$`;
- `DespesasService` expoe `despesas$`;
- a tela de despesas combina pessoas e despesas para montar uma view model pronta para exibicao.

Esse modelo ajuda a manter a interface sincronizada com o estado sem precisar de atualizacoes manuais espalhadas pela aplicacao.

### 8. Uso de `AsyncPipe`

Os componentes de listagem consomem streams diretamente no template com `AsyncPipe`.

Beneficios:

- menos gerenciamento manual de inscricoes;
- integracao natural com Observables;
- templates mais declarativos.

### 9. `signal()` no componente raiz

O projeto ja inclui uso de `signal()` no componente principal.

Mesmo que ainda de forma simples, isso mostra alinhamento com a direcao moderna do Angular para gerenciamento de estado local e reatividade mais previsivel.

### 10. Diretivas standalone personalizadas

Ha uma diretiva standalone chamada `PreventBlurDirective`, usada para ajustar o comportamento de interacao em elementos especificos da UI.

Isso demonstra um ponto importante do Angular moderno: criar blocos reutilizaveis e isolados sem depender de modulo compartilhado.

### 11. Pipes standalone do Angular

A apresentacao dos dados usa pipes nativos importados diretamente nos componentes:

- `CurrencyPipe`
- `DatePipe`
- `AsyncPipe`

Isso combina bem com a arquitetura standalone e mantem cada componente declarando apenas o que realmente usa.

### 12. Inputs obrigatorios com `@Input({ required: true })`

Os componentes de item, como pessoa e despesa, usam inputs marcados como obrigatorios.

Esse recurso melhora a seguranca da composicao dos componentes e ajuda a evitar erros de integracao entre pai e filho.

## Regras de negocio ja implementadas

Algumas regras importantes do dominio ja aparecem no codigo:

- o nome da pessoa nao pode ser vazio;
- nao e permitido cadastrar duas pessoas com o mesmo nome;
- a despesa precisa ter descricao;
- o valor da despesa deve ser maior que zero;
- cada despesa precisa estar vinculada a uma pessoa;
- nao e permitido abrir o cadastro de despesa sem haver pessoas cadastradas;
- ao remover uma pessoa, as despesas associadas tambem sao removidas.

Essas regras ja dao uma base consistente para a futura etapa de calculo do rateio final.

## Estrutura do projeto

Organizacao principal em `src/app`:

- `header/`: cabecalho da aplicacao;
- `pessoas/`: cadastro, listagem e remocao de participantes;
- `despesas/`: cadastro, listagem e remocao de despesas;
- `rateio/`: area reservada para a abertura do calculo;
- `resultado-rateio/`: estrutura inicial para exibicao do resultado final;
- `shared/`: dialogs e diretivas reutilizaveis.

Essa divisao esta coerente com uma arquitetura por feature, o que facilita a manutencao e a evolucao incremental do sistema.

## Persistencia local

Atualmente os dados sao persistidos no navegador com `localStorage`.

Chaves utilizadas:

- `pessoas`
- `despesas`

Isso e muito util nesta fase do projeto porque:

- simplifica o desenvolvimento;
- elimina a dependencia de backend;
- permite testar fluxos reais de uso rapidamente;
- preserva os dados entre recarregamentos da pagina.

## Internacionalizacao e localidade

O projeto foi preparado para o contexto brasileiro:

- locale `pt-BR`;
- formatacao monetaria em real;
- datas exibidas no padrao local;
- textos da interface em portugues.

Esse cuidado e especialmente importante para um sistema financeiro, ainda que simples.

## Como executar o projeto

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
- `npm test`: executa os testes unitarios configurados no projeto.

## Pontos de evolucao

Como o sistema ainda esta em andamento, os proximos passos naturais sao:

- implementar a logica completa do calculo de rateio;
- mostrar quem deve pagar e quem deve receber;
- consolidar saldos individuais;
- criar resumo final com total gasto, media por pessoa e diferencas;
- ampliar cobertura de testes;
- adicionar rotas para separar melhor os fluxos;
- considerar persistencia remota no futuro, se fizer sentido.

## Valor tecnico do projeto

Mesmo sendo um sistema pequeno e ainda em construcao, este projeto ja serve como um bom exemplo de Angular moderno aplicado a um problema real de negocio:

- arquitetura standalone;
- formularios reativos;
- composicao com Angular Material;
- fluxo reativo com RxJS;
- templates com nova sintaxe;
- preparacao para crescimento sem excesso de complexidade inicial.

Em outras palavras, e um projeto enxuto, atual e com uma base muito boa para continuar evoluindo.
