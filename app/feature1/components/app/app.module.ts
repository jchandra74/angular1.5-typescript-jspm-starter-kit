import { NgModule } from "./../../../core/angular-shim";

// import your own components, services, etc. here.
import { AppComponent } from "./app.component";
import { SampleService } from "./../../../services/sample.service";

@NgModule({
    declarations: [ AppComponent ],
    providers: [ SampleService ]
})
export class AppModule { }
