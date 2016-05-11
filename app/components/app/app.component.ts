import { ISampleService } from "./../../services/sample.service";
import { ISampleData } from "./../../models/models";

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
    templateUrl: "./app/components/app/app.component.html"
};

export { MyAppComponent }