import * as ng from "angular";
import { MyAppComponent } from "./components/app/app.component";
import { SampleService } from "./services/sample.service";

ng.module("myApp", [])
    .component("myApp", MyAppComponent)
    .service("sampleService", SampleService);

let appRootEl = document.querySelector("#appContainer") || document.body;

ng.bootstrap(appRootEl, [ "myApp" ]);
