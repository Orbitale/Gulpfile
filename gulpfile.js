// There here is YOUR config
// This var is an exemple of the assets you can use in your own application.
// The array KEYS correspond to the OUTPUT files,
// The array VALUES contain a LIST OF SOURCE FILES
var config = {
    "output_directory": "web",
    "less": {
        "css/main_less.css": [
            "web/components/bootstrap/less/bootstrap.less",
            "src/AppBundle/Resources/public/less/main.less"
        ]
    },
    "sass": {
        "css/main_sass.css": [
            "src/AppBundle/Resources/public/less/main.scss"
        ]
    },
    "css": {
        "css/main.css": [
            "src/AppBundle/Resources/public/css/main.css"
        ]
    },
    "js": {
        "js/main.js": [
            "web/components/bootstrap/dist/bootstrap-src.js",
            "src/AppBundle/Resources/public/css/main.js"
        ]
    }
};

/*************** End config ***************/
// Everything AFTER this line of code is updatable to the latest version of this gulpfile.
// Check it out there if you need: https://gist.github.com/Pierstoval/9d88b0dcb64f30eff4dc

// Required extensions
var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    watch        = require('gulp-watch'),
    less         = require('gulp-less'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    uglyfly      = require('gulp-uglyfly'),
    cssnano      = require('gulp-cssnano'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer')
;

var isProd = process.argv.indexOf('--prod') >= 0;

/*************** Gulp tasks ***************/

/**
 * Dumps the LESS assets
 */
gulp.task('less', function() {
    var list = config.less,
        outputDir = config.output_directory+'/',
        assets_output, assets, pipes, i, l
    ;
    for (assets_output in list) {
        if (!list.hasOwnProperty(assets_output)) { continue; }
        assets = list[assets_output];
        pipes = gulp
            .src(assets)
            .pipe(less())
            .pipe(concat(assets_output))
            .pipe(autoprefixer())
            .pipe(gulpif(isProd, cssnano()))
            .pipe(concat(assets_output))
            .pipe(gulp.dest(outputDir))
        ;

        console.info(" [file+] "+assets_output+" >");
        for (i = 0, l = assets.length; i < l; i++) {
            console.info("       > "+assets[i]);
        }
    }
});

/**
 * Dumps the SASS assets
 */
gulp.task('sass', function() {
    var list = config.sass,
        outputDir = config.output_directory+'/',
        assets_output, assets, pipes, i, l
    ;
    for (assets_output in list) {
        if (!list.hasOwnProperty(assets_output)) { continue; }
        assets = list[assets_output];
        pipes = gulp
            .src(assets)
            .pipe(sass())
            .pipe(concat(assets_output))
            .pipe(autoprefixer())
            .pipe(gulpif(isProd, cssnano()))
            .pipe(concat(assets_output))
            .pipe(gulp.dest(outputDir))
        ;

        console.info(" [file+] "+assets_output+" >");
        for (i = 0, l = assets.length; i < l; i++) {
            console.info("       > "+assets[i]);
        }
    }
});

/**
 * Dumps the CSS assets.
 */
gulp.task('css', function() {
    var list = config.css,
        outputDir = config.output_directory+'/',
        assets_output, assets, pipes, i, l
    ;
    for (assets_output in list) {
        if (!list.hasOwnProperty(assets_output)) { continue; }
        assets = list[assets_output];
        pipes = gulp
            .src(assets)
            .pipe(concat(assets_output))
            .pipe(autoprefixer())
            .pipe(gulpif(isProd, cssnano()))
            .pipe(concat(assets_output))
            .pipe(gulp.dest(outputDir))
        ;

        console.info(" [file+] "+assets_output+" >");
        for (i = 0, l = assets.length; i < l; i++) {
            console.info("       > "+assets[i]);
        }
    }
});

/**
 * Dumps the JS assets
 */
gulp.task('js', function() {
    var list = config.js,
        outputDir = config.output_directory+'/',
        assets_output, assets, pipes, i, l
    ;
    for (assets_output in list) {
        if (!list.hasOwnProperty(assets_output)) { continue; }
        assets = list[assets_output];
        pipes = gulp
            .src(assets)
            .pipe(sourcemaps.init())
            .pipe(concat({path: assets_output, cwd: ''}))
            .pipe(gulpif(isProd, uglyfly()))
            .pipe(gulp.dest(outputDir))
        ;

        console.info(" [file+] "+assets_output+" >");
        for (i = 0, l = assets.length; i < l; i++) {
            console.info("       > "+assets[i]);
        }
    }
});

/**
 * Will watch for files and run "dump" for each modification
 */
gulp.task('watch', ['dump'], function() {
    var files_less = [],
        files_css = [],
        files_sass = [],
        files_js = [],
        callback = function(event) {
            console.log('File "' + event.path + '" updated');
        },
        files_to_watch = [],
        i;

    console.info('Night gathers, and now my watch begins...');

    for (i in config.less) {
        if (!config.less.hasOwnProperty(i)) {
            continue;
        }
        files_less.push(config.less[i]);
        files_to_watch.push(config.less[i]);
    }
    for (i in config.sass) {
        if (!config.sass.hasOwnProperty(i)) {
            continue;
        }
        files_sass.push(config.sass[i]);
        files_to_watch.push(config.sass[i]);
    }
    for (i in config.css) {
        if (!config.css.hasOwnProperty(i)) {
            continue;
        }
        files_css.push(config.css[i]);
        files_to_watch.push(config.css[i]);
    }
    for (i in config.js) {
        if (!config.js.hasOwnProperty(i)) {
            continue;
        }
        files_js.push(config.js[i]);
        files_to_watch.push(config.js[i]);
    }

    if (files_to_watch.length) {
        console.info('Watching file(s):');
        // Flatten the array
        files_to_watch = [].concat.apply([], files_to_watch).sort();
        console.info("       > "+files_to_watch.join("\n       > "));
    }

    if (files_less.length) {
        gulp.watch(files_less, ['less']).on('change', callback);
    }
    if (files_sass.length) {
        gulp.watch(files_sass, ['sass']).on('change', callback);
    }
    if (files_css.length) {
        gulp.watch(files_css, ['css']).on('change', callback);
    }
    if (files_js.length) {
        gulp.watch(files_js, ['js']).on('change', callback);
    }
});

/**
 * Runs all the needed commands to dump all assets and manifests
 */
gulp.task('dump', ['less', 'sass', 'css', 'js']);

/**
 * Small user guide
 */
gulp.task('default', function(){
    console.info("");
    console.info("usage: gulp [command] [--prod]");
    console.info("");
    console.info("Options:");
    console.info("    --prod       If specified, will run cssnano and uglyfyjs when dumping the assets.");
    console.info("");
    console.info("Commands:");
    console.info("    less         Dumps the sources in the `config.less` parameter from LESS files.");
    console.info("    sass         Dumps the sources in the `config.sass` parameter from SCSS files.");
    console.info("    css          Dumps the sources in the `config.css` parameter from plain CSS files.");
    console.info("    js           Dumps the sources in the `config.js` parameter from plain JS files.");
    console.info("    dump         Executes all the above commands.");
    console.info("    watch        Executes 'dump', then watch all sources, and dump all assets once any file is updated.");
    console.info("");
});

// Gulpfile with a single var as configuration.
// License: MIT
// Author: 2016 - Alex "Pierstoval" Rock Ancelet <alex@orbitale.io>
// Repository: https://github.com/Orbitale/Gulpfile
