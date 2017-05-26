import { Component, Inject } from "./../../../core/angular-shim";
import { ILogService } from "angular";

import { ISampleService, SampleService } from "./../../../services/sample.service";
import { ISampleData } from "./../../../models/models";

// piece-meal imports for rxjs as recommended practice
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";

@Inject("$log", SampleService)
@Component({
    selector: "my-app",
    templateUrl: "/app/feature1/components/app/app.component.html"
})
export class AppComponent {

    name: string;
    message: string;

    subscription: Subscription;

    constructor(
        private $log: ILogService,
        private sampleService: ISampleService
    ) {
        // tslint:disable-next-line:no-string-literal
        this.name = this.constructor["name"];
    }

    $onInit(): void {
        this.$log.info(`[${this.name}] Initializing Controller...`);

        this.loadMessage();

        const myObs$: Observable<number> = Observable
            .from([1,2,3,4,5])
            .map(n => n * 5);

        this.subscription = myObs$.subscribe(
            n => console.log("data", n),
            e => console.error("error", e),
            () => console.log("COMPLETED")
        );
    }

    $onDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadMessage(): void {
        this.$log.info(`[${this.name}] Loading message...`, this);

        this.sampleService
            .getData()
            .then(this.onDataReceived.bind(this))
            .catch(this.handleError.bind(this));
    }

    onDataReceived(data: ISampleData): void {
        this.$log.info(`[${this.name}] onDataReceived`, data);
        this.message = data.message;
    }

    handleError(err: any): void {
        this.$log.info(`[${this.name}] handleError`, err);
        alert(err);
    }
}