#!/bin/sh
echo 'Installing dependencies'
cd back-end && sudo npm install --loglevel=error && sudo npm i --loglevel=error 
cd .. && cd energy_group012 && sudo npm install --loglevel=error && sudo npm i --loglevel=error
echo 'Running Tests for development on port 5000'
echo 'Connecting to energyTest database'
cd .. && cd  back-end && npm run test
echo 'Starting server for production on port 8765'
NODE_ENV='production' npm start 

