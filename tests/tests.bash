#!/bin/bash

# Go back to root project directory
cd `dirname $0`/../

echo "Removing node modules..."
rm -rf node_modules/

echo "Installing dependencies..."
npm install

echo "Preparing tests..."
node prepare_tests.js

echo "Executing gulp dump..."
./node_modules/.bin/gulp --gulpfile gulpfile.js dump
