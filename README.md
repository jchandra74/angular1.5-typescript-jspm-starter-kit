# Angular 1.5 with TypeScript and JSPM Starter Kit

This is my attempt to create a starter kit for Angular 1.5 that uses jspm and TypeScript.

To start using this, just clone this repository using
<pre>
git clone https://github.com/jchandra74/angular1.5-typescript-jspm-starter-kit.git
</pre>

or

<pre>
git clone https://github.com/jchandra74/angular1.5-typescript-jspm-starter-kit.git <i>MY_APP_FOLDER</i>
</pre>
where *`MY_APP_FOLDER`* is the folder name for your new project.

##Prerequisites

You'll need the followings installed:

1. node and npm (go [download](https://nodejs.org) it from the web or using your favorite package manager)

2. jspm CLI (`npm i -g jspm`) *

3. TypeScript CLI (`npm i -g typescript`) *

\* = *once you have node and npm*

Simply run `npm install` afterward to restore all the neccessary dependencies.

To run the sample, just run `npm start`.  This will launch the sample application.

## Building (Minification and Bundling)

To quickly bundle your app, you can type `npm run bundle` or `npm run bundle:prod`.

**NOTE:** Once bundled is created and injected, the app will be served from the generated `bundle.js` and therefore will break live-reloading while in development mode.
To re-enable live-reloading for script, run `jspm unbundle` to remove the bundling and rebundle again once you are ready for deployment.  

For more advanced bundling scenario, please read up on [jspm](https://github.com/jspm/jspm-cli).

## Credits
Most of package.json npm scripts have been shamelessly ripped from [angular.io getting started bits](https://angular.io/docs/ts/latest/quickstart.html)

## Change Log

| Date       |Details |
|-----------:|:-------|
| 2016-11-11 | Added support for RxJs 5.00 RC2. |
| <nobr>2017-04-30</nobr> | Removed requirement for typings since we'll be using @types instead.<br>Refactored out RxJs example to use recommended practice when using RxJS piecemeal for bundling optimization.<br>Added $onDestroy lifecycle hook that is used to dispose the RxJS subscription |
