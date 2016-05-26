# Base Gulpfile

This is a sample of Gulpfile to be used with config instead of "re-developing" manually each gulpfile.

## Requirements

* NodeJS 4+

## What it does provide

* Options:
 *     `--prod`       If specified, will run cssnano and uglyfyjs when dumping the assets.
* Gulp commands:
 *     `less`         Dumps the sources in the `config.less` parameter from LESS files.
 *     `sass`         Dumps the sources in the `config.sass` parameter from SCSS files.
 *     `css`          Dumps the sources in the `config.css` parameter from plain CSS files.
 *     `js`           Dumps the sources in the `config.js` parameter from plain JS files.
 *     `dump`         Executes all the above commands.
 *     `watch`        Executes 'dump', then watch all sources, and dump all assets once any file is updated.

## Install

* Copy/paste the `gulpfile.js` and the `package.json` files in the root directory of your project (or execute the command below).
* Run `npm install && npm shrinkwrap` command
 * [What is `shrinkwrap`?](https://docs.npmjs.com/cli/shrinkwrap)
   It's something you **should** use more often.
* Update the `config` variable in the `gulpfile.js` file so it fits to your needs.
* To view how this gulpfile works, simply run `gulp default` or `gulp` without any argument.
* Enjoy!

Or execute these commands in your project's root:

```bash
curl -LOk https://raw.githubusercontent.com/Orbitale/Gulpfile/master/gulpfile.js -o gulpfile.js
curl -LOk https://raw.githubusercontent.com/Orbitale/Gulpfile/master/package.json -o package.json
npm install
```

**:warning: Warning:** This will override your potentially existing `gulpfile.js` or `package.json` files.
