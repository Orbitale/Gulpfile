#!/bin/bash

set -e

# Go back to root project directory
cd `dirname $0`/../

echo "Directory: `pwd`"

REINSTALL=0

while test $# -gt 0
do
    case "$1" in
        --reinstall) REINSTALL=1
            ;;
    esac
    shift
done


if [[ ${REINSTALL} == 1 || ! -d "node_modules" ]]; then
    echo "Removing node modules..."
    rm -rf node_modules/

    echo "Installing dependencies..."
    yarn
fi

rm -f tests/output_tests/*
test -f tests/gulpfile.js && rm tests/gulpfile.js

echo "Preparing tests..."
node tests/prepare_tests.js

echo "Executing gulp dump..."
node node_modules/gulp4/bin/gulp.js --gulpfile tests/gulpfile.js test --prod

correctExitCode=$?

echo "Executing gulp dump for gulpfile that should have an error..."
set +e
notFoundOutput=$(node node_modules/gulp/bin/gulp.js --gulpfile tests/gulpfile_errored.js test --prod 2>&1)
erroredExitCode=$?
set -e

echo "Test expected files are correctly dumped"
echo -n " > gulpfile.js " && test ${correctExitCode} == 1 && echo "OK"

echo "Test gulpfiles with errors return the correct exit codes"
echo -n " > gulpfile_errored.js " && test ${erroredExitCode} == 1 && echo "OK"
