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
    npm install
fi

rm -f tests/output_tests/*
test -f tests/gulpfile.js && rm tests/gulpfile.js

echo "Preparing tests..."
node tests/prepare_tests.js

echo "Executing gulp dump..."
node node_modules/gulp4/bin/gulp.js --gulpfile tests/gulpfile.js dump --prod

echo "Executing gulp dump for gulpfile that should have an error..."
set +e
notFoundOutput=$(node node_modules/gulp/bin/gulp.js --gulpfile tests/gulpfile_errored.js dump --prod 2>&1)
exitCode=$?
set -e

echo "Test expected files are correctly dumped"
echo -n " > favicon.png "      && test -f tests/output_tests/favicon.png && echo "OK"
echo -n " > text_to_copy.txt " && cmp tests/output_expected/text_to_copy.txt tests/output_tests/text_to_copy.txt && echo "OK"
echo -n " > css.css "          && cmp tests/output_expected/css.css tests/output_tests/css.css && echo "OK"
echo -n " > js.js "            && cmp tests/output_expected/js.js tests/output_tests/js.js && echo "OK"
echo -n " > less.css "         && cmp tests/output_expected/less.css tests/output_tests/less.css && echo "OK"
echo -n " > sass.css "         && cmp tests/output_expected/sass.css tests/output_tests/sass.css && echo "OK"

echo "Test gulpfiles with errors return the correct exit codes"
echo -n " > gulpfile_errored.js " && test ${exitCode} == 1 && echo "OK"
