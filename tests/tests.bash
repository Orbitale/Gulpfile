#!/bin/bash

# Go back to root project directory
cd `dirname $0`/../

REINSTALL=0

while test $# -gt 0
do
    case "$1" in
        --reinstall) REINSTALL=1
            ;;
    esac
    shift
done


if [[ ${REINSTALL} == 1 ]]; then
    echo "Removing node modules..."
    rm -rf node_modules/

    echo "Installing dependencies..."
    npm install
fi

rm tests/output_tests/*
rm tests/gulpfile.js

echo "Preparing tests..."
node tests/prepare_tests.js

echo "Executing gulp dump..."
./node_modules/.bin/gulp --gulpfile tests/gulpfile.js dump --prod
