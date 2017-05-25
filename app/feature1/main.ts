import * as angular from "angular";
import { IModule } from "angular";

// remove any that are not needed and add more if you need other third party modules.
import "jquery";
import "angular-animate";
import "angular-sanitize";

// misc imports like css, gulped angular template cache, etc.
import "./tmp/templates";
import "./feature1.css!";

import { AppModule } from "./components/app/app.module";

// bootstrap this module to DOM element
let appRootEl: HTMLElement = document.body;
 angular.bootstrap(appRootEl, [ (<any>AppModule).name ]);
