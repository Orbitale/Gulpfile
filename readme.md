# Base Gulpfile

This is a sample of Gulpfile to be used with config instead of "re-developing" manually each gulpfile.

## Install

* Copy/paste the `gulpfile.js` and the `package.json` files in the root directory of your project.
* Run `npm install && npm shrinkwrap` command
 * [What is `shrinkwrap`?](https://docs.npmjs.com/cli/shrinkwrap)
   It's something you **must** use.
* Update the `config` variable in the `gulpfile.js` file so it fits to your needs.
* To view how this gulpfile works, simply run `gulp default` or `gulp` without any argument.
* Enjoy!

Or execute these commands in your project's root:

```bash
wget https://gist.github.com/Pierstoval/9d88b0dcb64f30eff4dc/archive/master.zip -O piersgulpfile.zip
unzip -o -d piersgulpfile-dir piersgulpfile.zip
cp -vf piersgulpfile-dir/*/{gulpfile.js,package.json} ./
rm -vfr piersgulpfile-dir piersgulpfile.zip
npm install
 
```

**Warning:** This will override your potentially existing `gulpfile.js` or `package.json` files.
