# Peer

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

Create a file called `.env`. In this file, ensure that the following environment variables
have definitions:

```ts
SERVER_BASE_URL= // the server that the app connects to for location data
PLACES_API_KEY=  // the api key for Google places
```

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
