import { Component } from "./../../../core/Component";
import { ILogService } from "angular";
import { ISampleService } from "./../../../services/sample.service";
import { ISampleData } from "./../../../models/models";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";

class AppComponentController {

    message: string;

    subscription: Subscription;

    static ComponentName: string = "AppComponent";

    static $inject: Array<string> = [ "$log", "sampleService" ];
    constructor(
        private $log: ILogService,
        private sampleService: ISampleService
    ) { }
    
    $onInit(): void {
        this.$log.info(`[${AppComponentController.ComponentName}] Initializing Controller...`);
        
        this.loadMessage();

        const myObs$ = Observable
            .from([1,2,3,4,5])
            .map(n => n * 5);

        this.subscription = myObs$.subscribe(
            n => console.log('data', n),
            e => console.error('error', e),
            () => console.log('COMPLETED')
        );
    }

    $onDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
    loadMessage(): void {
        this.$log.info(`[${AppComponentController.ComponentName}] Loading message...`);

        this.sampleService
            .getData()
            .then(this.onDataReceived.bind(this))
            .catch(this.handleError.bind(this));
    }

    onDataReceived(data: ISampleData): void {
        this.$log.info(`[${AppComponentController.ComponentName}] onDataReceived`, data);
        this.message = data.message;
    }

    handleError(err: any): void {
        this.$log.info(`[${AppComponentController.ComponentName}] handleError`, err);
        alert(err);
    }
}

let AppComponent: Component = {
    selector: "app",
    controller: AppComponentController,
    templateUrl: "/app/feature1/components/app/app.component.html"
};

export { AppComponent }