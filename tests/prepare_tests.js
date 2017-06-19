var fs = require('fs');
var path = require('path');
var testsDir = path.dirname(require.main.filename);

var config = {
    "output_directory": "output_tests",
    "images": {
        "": [
            "input/favicon.png"
        ]
    },
    "files_to_watch": [],
    "copy": {
        "": [
            "input/text_to_copy.txt"
        ]
    },
    "css": {
        "css.css": [
            "input/css.css"
        ]
    },
    "less": {
        "less.css": [
            "input/less.less"
        ]
    },
    "sass": {
        "sass.css": [
            "input/sass.scss"
        ]
    },
    "js": {
        "js.js": [
            "input/js.js"
        ]
    }
};

/**
 * Store working gulpfile
 */
var gulpfileContents = fs
    .readFileSync(testsDir+'/../gulpfile.js')
    .toString()
    .replace(
        /const config =(?:[^£]+)(\*+) End config \*/g,
        'const config = ' + JSON.stringify(config, null, 4) + ";\n"+ '/$1 End config *'
    )
;

fs.writeFileSync(testsDir+'/gulpfile.js', gulpfileContents);

/**
 * Store erroring gulpfile
 */

config.js['js.js'] = ['file_that_does_not_exist.js'];

gulpfileContents = fs
    .readFileSync(testsDir+'/../gulpfile.js')
    .toString()
    .replace(
    /const config =(?:[^£]+)(\*+) End config \*/g,
        'const config = ' + JSON.stringify(config, null, 4) + ";\n"+ '/$1 End config *'
    )
;

fs.writeFileSync(testsDir+'/gulpfile_errored.js', gulpfileContents);
