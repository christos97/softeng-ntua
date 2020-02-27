#!/bin/sh
echo 'Installing Dependencies'
cd back-end && sudo npm install --save && sudo npm i && cd ..
cd energy_group012 && sudo npm install -g --save oclif && sudo npm link && cd ..
cd back-end && npm run test --silent --if-present
echo 'Running Tests for development on port 5000'
echo 'Connecting to energyTest database'
cd  back-end && npm run test --silent
echo 'Starting server for production on port 8765'
NODE_ENV='production' npm start 

