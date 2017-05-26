import * as angular from "angular";
import { IModule } from "angular";

function kebabToCamel(s: string): string {
    return s.replace(/-\w/g, m => m[1].toUpperCase());
}

function Component(options: any): any {
    return function(target: any): any {
        var component: any = {...options};
        // tslint:disable-next-line:no-string-literal
        component["controller"] = target;
        // tslint:disable-next-line:no-string-literal
        component["selector"] = kebabToCamel(component["selector"]);
        return component;
    };
}

function Inject(...args: any[]): any {
    return function(target: any): any {
        var newArgs: string[] = args.map(a => {
            if (typeof a === "function")  { return a.name; }
            return ""+a;
        });
        // tslint:disable-next-line:no-string-literal
        if (typeof target["controller"] === "function") {
            // tslint:disable-next-line:no-string-literal
            console.log(`[DependencyInjection] Injecting into controller ${target["controller"].name} ${JSON.stringify(newArgs)}`);
            // tslint:disable-next-line:no-string-literal
            target["controller"].$inject = newArgs;
        } else {
            console.log(`[DependencyInjection] Injecting into service ${target.name} ${JSON.stringify(newArgs)}`);
            target.$inject = newArgs;
        }
    };
}

function Injectable(): any {
    return function(target:any): any {
        // don't really need to do anything, but is there to just provide same look and feel..
        return target;
    };
}

function NgModule(options: any): any {
    return function(target: any): any {
        var moduleName: string = target.name;
        var imports: any[] = options.imports || [];
        var app: IModule = angular.module(moduleName, imports);

        if (options.declarations.length > 0) {
            for(let component of options.declarations) {
                // tslint:disable-next-line:no-string-literal
                console.log(`[ComponentRegistration] ${component["controller"].name} selector: ${component.selector}`);
                app.component(component.selector, component);
            }
        }

        if (options.providers.length > 0) {
            for(let service of options.providers) {
                console.log(`[ServiceRegistration] ${service.name}`);
                app.service(service.name, service);
            }
        }

        return target;
    };
}

export { Component, Inject, Injectable, NgModule };