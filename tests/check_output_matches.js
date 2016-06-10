var fs = require('fs');
var path = require('path');
var testsDir = path.dirname(require.main.filename);
var incorrectFiles = [];

var error = false;

var filesToWatch = [
    'css.css',
    'js.js',
    'less.css',
    'sass.css'
];

console.log('Testing...');

for (var i = 0, l = filesToWatch.length; i < l; i++) {
    var file = filesToWatch[i];
    var outputContent = fs.readFileSync(testsDir+'/output_tests/'+file).toString().trim();
    var expectedContent = fs.readFileSync(testsDir+'/output_expected/'+file).toString().trim();

    if (outputContent !== expectedContent) {
        error = true;
        incorrectFiles.push({
            file: file,
            expected: expectedContent,
            test_result: outputContent
        });
        process.stdout.write('\x1b[37m\x1b[41mE\x1b[0m');
    } else {
        process.stdout.write('\x1b[32m.\x1b[0m');
    }
}

if (error) {
    console.log("\nErrors:");
    console.log(JSON.stringify(incorrectFiles, null, 4));
    process.exit(1);
} else {
    console.log("\nOk!");
}
