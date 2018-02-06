#!/bin/bash

set +e

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

rm -f tests/gulpfiles/*

echo "Preparing tests..."
node tests/prepare_tests.js

echo "Executing tests..."

echo "Moving to the tests/fixtures/ directory"
cd tests/fixtures

function process_gulpfile {
    local gulpfile=$1
    rm -rf tests/output_tests/*
    output=$(node ../../node_modules/gulp4/bin/gulp.js --gulpfile gulpfile_${gulpfile}.js test --prod 2>&1)
    exitCode=$?
    return ${exitCode}
}

errors=()

function assert {
    gulpfile=$1
    shift
    "$@"
    exitCode=$?
    if [ ${exitCode} -eq 0 ]; then
        echo -n "."
    else
        echo -n "F"
        errors+=("${gulpfile}")
    fi
}

gulpfile="successful" && process_gulpfile "${gulpfile}"
assert "${gulpfile}" test "${exitCode}" == 0

rm -f output/*

gulpfile="missing_file" && process_gulpfile "${gulpfile}"
assert "${gulpfile}" test "${exitCode}" == 1
strtocheck="Missing input files"
assert "${gulpfile}" test "${output#*$strtocheck}" != "$output"

rm -f output/*

gulpfile="missing_wildcard_files" && process_gulpfile "${gulpfile}"
assert "${gulpfile}" test "${exitCode}" == 1
strtocheck="Missing input files"
assert "${gulpfile}" test "${output#*$strtocheck}" != "$output"

rm -f output/*

echo ""
echo "Failing gulpfiles:"
echo "${errors}"
