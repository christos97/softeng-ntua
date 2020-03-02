echo 'Installing ClI Dependencies'
#cd energy_group012 && npm install -g --save oclif && cd ..
cd energy_group012 && sudo npm install --save --loglevel=error && sudo npm i --loglevel=error
echo 'Running cli tests on production server on port 8765'
npm run test --silent 
echo 'Setting up CLI'
sudo npm link --silent
echo 'Type energy_group012 --help'

