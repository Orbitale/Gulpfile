:warning: This package is not maintained anymore. It should still work though. For an alternative, take a look at [Rollup](https://rollupjs.org) or [Webpack](https://webpack.js.org/).

[![Build Status](https://travis-ci.org/Orbitale/Gulpfile.svg?branch=gulp4)](https://travis-ci.org/Orbitale/Gulpfile)

# Base Gulpfile

This is a sample of Gulpfile to be used with config instead of "re-developing" manually each gulpfile.

⚠️ You are looking at the version using Gulp 4. This version is still in alpha mode.
If you want to look at the version using Gulp 3, [go there](https://github.com/Orbitale/Gulpfile/tree/master).

## Requirements

* NodeJS 4+
* NPM if you don't have choice, Yarn instead (recommended).
* Gulp 4

## What it does provide

* Options:
  * `--prod`       If specified, will run clean-css and uglyfyjs when dumping the assets.
* Gulp commands:
  * `images`       Dumps the sources in the `config.images` parameter from image files.
  * `less`         Dumps the sources in the `config.less` parameter from LESS files.
  * `sass`         Dumps the sources in the `config.sass` parameter from SCSS files.
  * `css`          Dumps the sources in the `config.css` parameter from plain CSS files.
  * `js`           Dumps the sources in the `config.js` parameter from plain JS files.
  * `dump`         Executes all the above commands.
  * `watch`        Executes `dump`, then watches all sources, and dump all assets once any file
  is updated.
* Logs: when you run a command, there are plenty of `console` calls that log things that happen,
 which allow you to know what is happening, what files are managed, updated. All with time info.

## Install

### By copy/pasting

* Copy/paste the `gulpfile.js` and the `package.json` files in the root directory of your project
(or execute the command below).
* Install dependencies:
    * Choice 1: Run `npm install && npm shrinkwrap` command
       * [What is `shrinkwrap`?](https://docs.npmjs.com/cli/shrinkwrap)
        It's something you **should** use more often if you use `npm`.
    * Choice 2: Run `yarn install` command, and a `yarn.lock` will magically appear
* Update the `config` variable in the `gulpfile.js` file so it fits to your needs.
* To view how this gulpfile works, simply run `gulp default` or `gulp` without any argument.
* Enjoy!

### With a simple bash script

Or execute these commands in your project's root:

```bash
curl -LOk https://raw.githubusercontent.com/Orbitale/Gulpfile/gulp4/gulpfile.js -o gulpfile.js
curl -LOk https://raw.githubusercontent.com/Orbitale/Gulpfile/gulp4/package.json -o package.json
yarn install
```

**:warning: Warning:** This will override your potentially existing `gulpfile.js` or `package.json`
files.

### Install Gulp globally

If you are using gulpfiles in many projects (this one or any gulpfile), you can use this script to
install gulp globally:

```bash
npm install -g "gulp4"
```

Remember that **you still have to run `npm install` to have all gulp plugins**, else nothing will work.

:warning: Be sure to install **only gulp** when you install globally. Else, other dependencies that
are used locally may not match your dependencies.

:warning: This may not be the best option though, remember that _global_ dependencies may create
conflicts and not work properly (Nodejs and npm... :trollface: ).

## Update

If you are already using this file and want to "update" to the new versions (there are some new
versions sometimes), just take everything from [our gulpfile](gulpfile.js) starting from the line
containing this:

`/*************** End config ***************/`

Starting from this line, you can copy/paste everything, unless you have your own logic inside the
gulpfile, then you'll have to keep your code, just be careful not to lose your own code :wink:
