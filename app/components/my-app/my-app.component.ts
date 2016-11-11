import { ISampleService } from "./../../services/sample.service";
import { ISampleData } from "./../../models/models";
import * as ng from 'angular';
import { Observable } from 'rxjs';

class MyAppComponentController {
    message: string;
    
    static $inject: Array<string> = [ "$log", "sampleService" ];
    constructor(
        private $log: ng.ILogService,
        private sampleService: ISampleService
    ) {
    }
    
    $onInit() {
        this.$log.info("In component initialization lifecycle hook...");
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
        let self = this;
        this.sampleService
            .getData()
            .then((data: ISampleData) => {
                self.message = data.message;
            })
            .catch(err => {
               alert(err); 
            });
    }
}

let MyAppComponent = {
    controller: MyAppComponentController,
    templateUrl: "./app/components/my-app/my-app.component.html"
};

export { MyAppComponent }