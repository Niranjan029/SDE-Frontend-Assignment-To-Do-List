# Todo Frontend

A small Angular-based Todo / Tasks frontend application styled with the Salesforce Lightning Design System (SLDS).

This README contains quick steps to get the project running locally, run tests, and build a production bundle.

Prerequisites
- Node.js (v18+ recommended)
- npm (v8+ recommended)

Quick start

1. Clone the repository and change to the project folder:

	git clone <repo-url>
	cd SDE-Frontend-Assignment-To-Do-List

2. Install dependencies:

	npm install

3. Run the development server:

	npm start

	The Angular dev server starts (default port: 4200). Open http://localhost:4200 in your browser.

Running tests

Unit tests are powered by Mocha + Chai and run the TypeScript tests through `ts-node`.

Run the test suite:

	npm test

If you see module resolution errors when running tests related to ESM or ts-node loaders, try deleting `node_modules` and reinstalling, or run `npm test` again. The test runner is configured to compile TypeScript tests on the fly.

Build (production)

Create a production bundle:

	npm run build

Files of interest
- `src/app/features/tasks/` — Task list and Task form components
- `src/app/core/services/task.service.ts` — In-memory task service
- `src/app/core/models/task.model.ts` — Task model shape
- `src/styles.scss` — Global styles and small customizations

Notes
- The project uses SLDS for styling. SLDS assets are included via `node_modules` and referenced from `angular.json` and `src/assets`.
- The app currently uses an in-memory `TaskService` — there is no backend. To persist data, replace the service implementation with HTTP calls.
- Tests live under `test/` and use small runtime mocks (`test/angular-mocks.ts`) to avoid bootstrapping Angular in unit tests.

Troubleshooting
- If the dev server fails to start, ensure you have a compatible Node version. Run `node -v` and `npm -v`.
- If tests fail with loader/module resolution errors, ensure `ts-node` and `mocha` are installed (they are devDependencies) and run `npm ci` or `npm install` again.

Contributing
- Make changes on a feature branch, lint and run tests locally, and open a pull request.

Contact
- If you need help running or modifying the app, describe the problem and paste terminal output when asking for assistance.

Enjoy!

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
