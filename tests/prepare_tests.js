var fs = require('fs');
var path = require('path');
var testsDir = path.dirname(require.main.filename);

var config = {
    "output_directory": "output_tests",
    "images": {},
    "files_to_watch": [],
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

var gulpfileContents = fs
    .readFileSync(testsDir+'/../gulpfile.js')
    .toString()
    .replace(
        /var config =(?:[^£]+)(\*)+ End config/g,
        'var config = ' + JSON.stringify(config, null, 4) + ";\n"+ '/$1 End config'
    )
;

fs.writeFileSync(testsDir+'/gulpfile.js', gulpfileContents);

