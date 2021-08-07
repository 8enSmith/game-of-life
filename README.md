[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb5c7fa3-de10-4bd2-a1ef-bac60f78a338/deploy-status)](https://app.netlify.com/sites/game-of-1ife/deploys)

# Game of Life

This project is an implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using TypeScript and React.

> The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

The cells on the board conform to the following rules:

- A cell can be made "alive"
- A cell can be "killed"
- A cell with fewer than two live neighbours dies of under-population
- A cell with 2 or 3 live neighbours lives on to the next generation
- A cell with more than 3 live neighbours dies of overcrowding
- An empty cell with exactly 3 live neighbours "comes to life"

A user can manually toggle a cell to be dead or alive by clicking on the board.

The board evolution can be paused/started using the "Pause"/"Start" button. The board can also be reset using the "Reset" button.

You can see the app [here](https://game-of-1ife.netlify.app).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Clone the project:

```zsh
  git clone https://github.com/8enSmith/game-of-life.git
```

Go to the project directory:

```zsh
  cd game-of-life
```

Install dependencies:

```zsh
  yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

[MIT](https://choosealicense.com/licenses/mit/)
