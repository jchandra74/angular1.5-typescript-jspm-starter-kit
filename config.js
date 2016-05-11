System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*"
  },

  packages: {
    "app": {
      "main": "main.js",
      "defaultJSxtension": "js"
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.5"
  }
});
