var fs = require('fs');
var path = require('path');
var testsDir = path.dirname(require.main.filename);
var gulpfileContents = fs.readFileSync(testsDir+'/../gulpfile.js').toString()

    // Update output directory
    .replace(
        /"output_directory": "web",/g,
        '"output_directory": "output_tests",'
    )

    // Setup all command options to run everything

    .replace(
        /"css": \{([^}]+)\}/g,
        '"css": {' +
            '"output_expected/css.css": [' +
                '"input/css.css"' +
            ']' +
        '}'
    )
    .replace(
        /"less": \{([^}]+)\}/g,
        '"less": {' +
            '"output_expected/less.less": [' +
                '"input/less.less"' +
            ']' +
        '}'
    )
    .replace(
        /"js": \{([^}]+)\}/g,
        '"js": {' +
            '"output_expected/js.js": [' +
                '"input/js.js"' +
            ']' +
        '}'
    )
;

fs.writeFileSync(testsDir+'/gulpfile.js', gulpfileContents);

