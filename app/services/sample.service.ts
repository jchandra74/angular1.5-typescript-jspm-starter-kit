interface ISampleService {
    getData(): ng.IPromise<any>
}

class SampleService implements ISampleService {
    static $inject = [ "$http", "$q", "$log" ]
    
    constructor(
       private $http: ng.IHttpService,
       private $q: ng.IQService,
       private $log: ng.ILogService
    ) {
    }
    
    getData(): ng.IPromise<any> {
        this.$log.info("Getting data...");
        
        return this.$http
            .get("/data/sample.data.json")
            .then(res => res.data)
            .catch(err => {
                this.$log.error(err);
                this.$q.reject("Unable to load data");
            });
    }
}

export { ISampleService, SampleService }