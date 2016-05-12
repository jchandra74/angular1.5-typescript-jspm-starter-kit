#Angular 1.5 with TypeScript and JSPM Starter Kit

This is my attempt to create a starter kit for Angular 1.5 that uses jspm and TypeScript.

To start using this, just clone this repository using
```
git clone https://github.com/jchandra74/angular1.5-typescript-jspm-starter-kit.git
```

or

```
git clone https://github.com/jchandra74/angular1.5-typescript-jspm-starter-kit.git MY_APP_FOLDER
```
where ```MY_APP_FOLDER``` is the folder name for your new project.


##Prerequisites
You'll need the followings installed:
1. node and npm (go downloaded it from the web)
2. jspm CLI (```npm i -g jspm``` once you have node and npm)
3. TypeScript CLI (```npm i -g typescript``` once you have node and npm)
4. Typings CLI (```npm i -g typings``` once you have node and npm)

Simply run ```npm install``` afterward to restore all the neccessary dependencies.

To run the sample, just run ```npm start```.  This will launch the sample application.

To bundle and minify all the JavaScript files, run ```jspm bundle app --minify --inject```.
For more advanced bundling scenario, please read up on jspm.