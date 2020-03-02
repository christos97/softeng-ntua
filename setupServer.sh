echo 'Installing Server Dependencies'
cd back-end && sudo npm install --save --loglevel=error  && sudo npm i --loglevel=error  && cd ..
echo 'Running back-end tests on development server on port 5000'
echo 'Connecting to energyTest database'
cd back-end && npm run test --silent --if-present
echo 'Starting production server on port 8765'
NODE_ENV='production' npm start --silent
