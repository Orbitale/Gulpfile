#!/bin/bash

# Go back to root project directory
cd `dirname $0`/../

if [[ '--reinstall' == *"$*"* ]]; then
    echo "Removing node modules..."
    rm -rf node_modules/

    echo "Installing dependencies..."
    npm install
fi

echo "Preparing tests..."
node tests/prepare_tests.js

echo "Executing gulp dump..."
./node_modules/.bin/gulp --gulpfile tests/gulpfile.js dump
