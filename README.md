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
  *     `watch`        Executes 'dump', then watch all sources, and dump all assets once any file
  is updated.

## Install

### By copy/pasting

* Copy/paste the `gulpfile.js` and the `package.json` files in the root directory of your project
(or execute the command below).
* Run `npm install && npm shrinkwrap` command
 * [What is `shrinkwrap`?](https://docs.npmjs.com/cli/shrinkwrap)
   It's something you **should** use more often.
* Update the `config` variable in the `gulpfile.js` file so it fits to your needs.
* To view how this gulpfile works, simply run `gulp default` or `gulp` without any argument.
* Enjoy!

### With a simple bash script

Or execute these commands in your project's root:

```bash
curl -LOk https://raw.githubusercontent.com/Orbitale/Gulpfile/master/gulpfile.js -o gulpfile.js
curl -LOk https://raw.githubusercontent.com/Orbitale/Gulpfile/master/package.json -o package.json
npm install
```

**:warning: Warning:** This will override your potentially existing `gulpfile.js` or `package.json`
files.

### Install Gulp globally

If you are using gulpfiles in many projects (this one or any gulpfile), you can use this script to
install gulp globally:

```bash
npm install -g "gulp@^3.9"
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
