# Rachid

A web application built with Angular to calculate how much each person owes or should receive in a cost-sharing split among friends.

The problem the system solves is simple to understand but very common in real life: several people take part in a trip, gathering, or event, payments are made by different people, and at the end the total amount needs to be divided equally among everyone.

The goal of the app is to register this information, consolidate the expenses, and clearly show:

- how much was spent in total;
- how much each person should pay;
- who has a positive or negative balance;
- who owes whom.

## Demo

The published application can be accessed at:

- [GitHub Pages - Rachid](https://rgiovann.github.io/angular-rachid/)

## Current status

The project already delivers a fully functional end-to-end flow:

- registration of people;
- registration of expenses with description, date, amount, and responsible person;
- removal of people and expenses;
- cascade deletion of expenses when a person is removed;
- local persistence with `localStorage`;
- basic form validations;
- confirmation and warning dialogs;
- complete split calculation;
- display of the consolidated result in a dedicated dialog;
- refined visual support for desktop and mobile screens;
- automated tests for the main algorithm rule.

## Usage example

Consider 3 people:

- Antonio
- Jose
- Mario

Payments made:

- Antonio paid `R$ 170.00`
- Jose paid `R$ 75.00`
- Jose paid `R$ 25.00`

Total spent:

- `R$ 270.00`

Amount per person:

- `R$ 90.00`

Expected result:

- Jose owes `R$ 23.33` to Antonio
- Mario owes `R$ 56.67` to Antonio
- Mario owes `R$ 33.33` to Jose

This is one of the scenarios used to validate the algorithm in the project.

## How the result is presented

When the `Split` button is clicked, the system:

1. consolidates all registered expenses;
2. calculates the equal share per participant;
3. identifies each person's individual balance;
4. reduces debit/credit crossings to arrive at the final transfers;
5. displays a visual report with:
- total expenses;
- amount per person;
- each participant's balance;
- lines of the type `OWES ... to ...` and `RECEIVES ... from ...`;
- indication of `All settled` when there are no pending transactions.

## Split feature architecture

The project follows a simple and clean separation between business logic and interface:

- `src/app/rateio/rateio.service.ts`
  Calculates the split based on registered people and expenses.

- `src/app/rateio/rateio.model.ts`
  Defines the data contracts used as output from the calculation.

- `src/app/resultado-rateio/`
  Contains the component responsible for transforming the result into a visual report for the user.

- `src/app/app.ts`
  Orchestrates the `Split` button click, calls the service, and opens the result dialog.

This structure avoids mixing financial calculation with rendering and makes maintenance, testing, and future evolution easier.

## Calculation logic

The algorithm implemented in TypeScript was ported from a previously validated Java version.

In short, it works as follows:

1. sums all payments made;
2. calculates how much each person should equally pay;
3. records, for each expense, how much each of the other people owes the payer;
4. consolidates reciprocal relationships between pairs of people;
5. eliminates irrelevant numerical residues with floating-point tolerance;
6. returns:
- total spent;
- amount per person;
- individual balances;
- final transfers between debtors and creditors.

## Modern Angular used in the project

This project applies several current practices from the Angular ecosystem:

- standalone components;
- `bootstrapApplication`;
- `signal()` in the root component;
- templates with `@for` and `@if`;
- typed reactive forms;
- integration with Angular Material;
- `AsyncPipe`;
- pipes imported directly into components;
- custom standalone directive;
- use of RxJS with `BehaviorSubject`, `Observable`, `combineLatest`, and `map`.

## UI/UX features implemented

Throughout the build, the interface went through important refinements:

- header reorganization for smaller screens;
- adaptation of main buttons for mobile;
- dialogs with fluid width to avoid clipping on narrow viewports;
- split report with a summary at the top and a per-person listing;
- visual highlights for:
  - `OWES` in red;
  - `RECEIVES` in green;
  - positive balance in green;
  - negative balance in red;
- alphabetical ordering of people in the final result.

## Business rules already implemented

The project already covers several important rules:

- a person's name cannot be empty;
- registering two people with the same name is not allowed;
- an expense must have a description;
- the expense amount must be greater than zero;
- each expense must be linked to a person;
- opening the expense registration without any registered people is not allowed;
- when a person is removed, their associated expenses are also removed;
- the split result is calculated only when there are both people and expenses registered.

## Project structure

Main organization under `src/app`:

- `header/`: application header;
- `pessoas/`: registration, listing, and removal of participants;
- `despesas/`: registration, listing, and removal of expenses;
- `rateio/`: service, models, and tests for the calculation logic;
- `resultado-rateio/`: visual component for the final report;
- `shared/`: reusable dialogs and directives.

## Local persistence

Data is currently persisted in the browser using `localStorage`.

Keys used:

- `pessoas`
- `despesas`

This allows quick testing without depending on a backend and preserves data between page reloads.

## Locale

The project was prepared for the Brazilian context:

- locale `pt-BR`;
- monetary formatting in Brazilian Real;
- dates displayed in the local standard;
- interface in Portuguese.

## Tests

The split calculation rule has automated tests in:

- `src/app/rateio/rateio.service.spec.ts`

Currently there are scenarios based on real examples previously validated in the Java version of the algorithm.

To run the tests:

```bash
npm.cmd test -- --watch=false --include=src/app/rateio/rateio.service.spec.ts
```

## How to run the project locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Then access:

```text
http://localhost:4200
```

## Available scripts

- `npm start`: starts the development server with `ng serve`;
- `npm run build`: generates the production build;
- `npm run watch`: generates the build in development mode with watch;
- `npm test`: runs the tests configured in the project.

## Evolution points

Although the main split feature is already functional, there are still interesting paths for evolution:

- expand test coverage;
- add more algorithm validation scenarios;
- further improve the visual presentation of the report;
- consider remote persistence in the future;
- separate flows with routing, if it makes sense for the app's evolution.

## Technical value of the project

Even though it is a small system, the project brings together several relevant aspects of applied software engineering:

- business rule modeling;
- algorithm porting from Java to TypeScript;
- feature-based architecture;
- responsiveness;
- integration with Angular Material;
- automated tests;
- concern for the readability of the final result for the user.

In other words, it is a lean, up-to-date project with a very clear real-world business problem.
