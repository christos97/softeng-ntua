#!/bin/sh

echo 'Automating Tasks'
cd back-end && npm run test && NODE_ENV='production' npm start 