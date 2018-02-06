let fs = require('fs');
let path = require('path');
let testsDir = path.dirname(require.main.filename);

let dumpGulpfile = (fileName, config) => {
    fs.writeFileSync(testsDir+'/fixtures/gulpfile_'+fileName+'.js', fs.readFileSync(testsDir+'/../gulpfile.js').toString().replace(
        /const config =(?:[^£]+)(\*+) End config \*/g,
        'const config = ' + JSON.stringify(config, null, 4) + ";\n"+ '/$1 End config *'
    ));
    console.log('> fixtures/gulpfile_'+fileName+'.js');
};

let config = {
    "output_directory": "output",
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

dumpGulpfile('successful', config);

var missingFile = config;
missingFile.js['js.js'] = ['file_that_does_not_exist.js'];
dumpGulpfile('missing_file', missingFile);

var silentGulpError = config;
silentGulpError.js['js.js'] = ['input/js/*'];
dumpGulpfile('missing_wildcard_files', silentGulpError);
