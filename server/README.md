# MaPic API Backend

## Configure the API

Make sure to configure the `config.js` file in the `config` folder. Google Cloud keys are also required to use storage and vision. Both keys 'google_storage_api_key.json' and 'google_vision_api_key.json' can be added to the './helpers/google_keys/' folder.

## Build the API
Nodes modules can be quickly installed with
```shell
npm build
```

## Run the API
Production mode:
```shell
npm start
```

Development mode:
```shell
npm run start:dev
```
