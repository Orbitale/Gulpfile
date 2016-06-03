var fs = require('fs');
var path = require('path');
var testsDir = path.dirname(require.main.filename);
var gulpfileContents = fs.readFileSync(testsDir+'/../gulpfile.js').toString();

gulpfileContents = gulpfileContents.replace(
    /"css": \{([^}]+)\}/g,
    '"css": {' +
        '"output_expected/css.css": [' +
            '"input/css.css"' +
        ']' +
    '}'
);

fs.writeFileSync(testsDir+'/gulpfile.js', gulpfileContents);
