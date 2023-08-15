# node-typescript-boilerplate

Includes:

- [TypeScript][typescript] [5.0][typescript-5-0]
- [ESM][esm]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier][prettier] to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- [EditorConfig][editorconfig] for consistent coding style
- Simple example of TypeScript code and unit test

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs] (20.5.0).

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES22,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## Important note(s)
### Copying/renaming resources to and in build folder
Normally a bundler like Babel or Webpack is used to copy resource files into the build folder. 
For this project this is replaced by copyfiles as a quick fix.
With this quick fix, overwriting environment files onto the correct path like '.env-prd.env' -> '.env' is also not supported, and is now done manually.
Whenever this quick fix is replaced, also delete package.

## Additional Information

### Path alias
For creating/editing path aliases, the following files should all be changed: `tsconfig.json`, `package.json`, `jest.config.js`

### Clean build
Whenever removing the build folder, also remove the tsconfig.tsbuildinfo because the building is set configured for incremental builds

### The Core folder
The core folder should be regarded as a library, thus locked.
Whenever one is in need to change or add code inside the core folder, he/she should make these changes from the `boilerplate` branch and merge the `boilerplate` branch into this project.
