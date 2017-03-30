import * as angular from "angular";
import { IModule } from "angular";

// remove any that are not needed and add more if you need other third party modules.
import "jquery";
import "angular-animate";
import "angular-sanitize";

// import your own components, services, etc. here.
import { AppComponent } from "./components/app/app.component";
import { SampleService } from "../services/sample.service";

// misc imports like css, gulped angular template cache, etc.
import "./tmp/templates";
import "./feature1.css!";

let app: IModule = angular.module("myApp", []);

// register necessary things with this angular module

app
    .component(AppComponent.selector, AppComponent)
    .service("sampleService", SampleService);

// bootstrap this module to DOM element

let appRootEl = document.body;
angular.bootstrap(appRootEl, [ "myApp" ]);
