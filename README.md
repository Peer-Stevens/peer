# Peer

[![CI Lint](https://github.com/Peer-Stevens/peer/actions/workflows/lint.yml/badge.svg)](https://github.com/Peer-Stevens/peer/actions/workflows/lint.yml)
[![CI Test](https://github.com/Peer-Stevens/peer/actions/workflows/test.yml/badge.svg)](https://github.com/Peer-Stevens/peer/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Peer-Stevens/peer/branch/main/graph/badge.svg?token=GQU7RZ6VBU)](https://codecov.io/gh/Peer-Stevens/peer)

Explorative navigation app for the blind and visually impaired for iOS and Android.

## Setup

Run:

```
npm i -g yarn
yarn global add expo-cli
```

If running `expo --version` does not yield a version number, add this line to your `.bashrc`:

```
export PATH="$(yarn global bin):$PATH"
```

then restart your terminal.

Run:

```
yarn
```

to install all dependencies.

## Run

To run the app, run:

```
yarn start
```

## Lint

To lint the app for formatting, run:

```
yarn run lint
```

To find out if the above command would change anything, run:

```
yarn run lint-check
```
