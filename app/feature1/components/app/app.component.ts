import { Component } from "./../../../core/Component";
import { ILogService } from "angular";
import { ISampleService } from "./../../../services/sample.service";
import { ISampleData } from "./../../../models/models";
import { Observable } from 'rxjs';

class AppComponentController {

    message: string;

    static ComponentName: string = "AppComponent";

    static $inject: Array<string> = [ "$log", "sampleService" ];
    constructor(
        private $log: ILogService,
        private sampleService: ISampleService
    ) { }
    
    $onInit() {
        this.$log.info(`[${AppComponentController.ComponentName}] Initializing Controller...`);
        this.loadMessage();

        const myObs$ = Observable.from([1,2,3,4,5])
            .map(n => n * 5);

        const sub = myObs$.subscribe(
            n => console.log('data', n),
            e => console.error('error', e),
            () => console.log('COMPLETED')
        );

        sub.unsubscribe();
    }
    
    loadMessage(): void {
        this.$log.info(`[${AppComponentController.ComponentName}] Loading message...`);

        this.sampleService
            .getData()
            .then(this.onDataReceived)
            .catch(this.handleError);
    }

    onDataReceived(data: ISampleData): void {
        this.message = data.message;
    }

    handleError(err: any): void {
        alert(err);
    }
}

let AppComponent: Component = {
    selector: "app",
    controller: AppComponentController,
    templateUrl: "/app/feature1/components/app/app.component.html"
};

export { AppComponent }