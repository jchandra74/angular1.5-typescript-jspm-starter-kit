import angular from "angular";

function Component(options: any) {
    return function(target: any) {
        var component = {...options};
        component["controller"] = target;
        return component;
    }
}

function Inject(...args) {
    return function(target: any) {
        var newArgs = args.map(a => {
            if (typeof a === "string") return a;
            return a["name"];
        });
        target["controller"].$inject = newArgs;
    }
}

function Injectable() {
    return function(target:any) {
        target["serviceName"] = target.name;
        return target;
    }
}

// not done yet... need to add providers
function NgModule(options: any) {
    return function(target: any) {
        var moduleName = target.name;
        var imports = options.imports;
        var module = angular.module(moduleName, imports);

        return module;
    }
}

export { Component, Inject, NgModule }