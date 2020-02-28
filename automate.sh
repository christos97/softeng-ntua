#!/bin/sh
echo 'Installing Dependencies'
#sudo npm install -g --save oclif
cd back-end && sudo npm install --save --loglevel=error && sudo npm i --loglevel=error && cd ..
echo 'Running backend tests for development stage on port 5000'
echo 'Connecting to energyTest database'
cd  back-end && npm run test --silent && cd ..
cd energy_group012 && sudo npm install --save --loglevel=error && sudo npm i --loglevel=error && sudo npm link && cd .. && cd back-end
echo 'Starting server for production stage on port 8765'
NODE_ENV='production' npm start --silent 

