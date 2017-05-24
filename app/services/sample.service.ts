import * as angular from "angular";
import { IHttpPromise, ILogService, IQService, ITimeoutService, IHttpService } from "angular";

import { Injectable } from "./../core/angular-shim";

import env from "./../environment";
import { DEV_HTTP_LONG_DELAY_MS, DEV_HTTP_SHORT_DELAY_MS } from "./../environment";

interface ISampleService {
    getData(): IHttpPromise<any>;
    saveData(data: any): IHttpPromise<any>;
}

@Injectable
class SampleService implements ISampleService {

    public name: string;

    static $inject: Array<string> = [ "$http", "$q", "$log", "$timeout" ]    
    constructor(
       private $http: IHttpService,
       private $q: IQService,
       private $log: ILogService,
       private $timeout: ITimeoutService
    ) { 
        this.name = this.constructor["name"];
    }
    
    getData(): IHttpPromise<any> {
        this.$log.info(`[${this.name}] Getting data...`);

        let httpPromise: IHttpPromise<any>;

        if (env !== "PRODUCTION") {
            // simulate delay and get sample data
            httpPromise = this.$timeout(DEV_HTTP_LONG_DELAY_MS)
                .then( _ => this.$http.get("/data/sample.data.json"));
        } else {
            // real API Url endpoint here.
            httpPromise = this.$http.get("/api/data/blah");
        }
        
        return httpPromise
            .then(({data}) => data)
            .catch(err => {
                this.$log.error(err);
                this.$q.reject("Unable to load data");
            });
    }

    saveData(data: any) : IHttpPromise<any> {
        this.$log.info(`[${this.name}] Saving data...`);

        let httpPromise: IHttpPromise<any>;

        if (env !== "PRODUCTION") {

        } else {
            httpPromise = this.$timeout(DEV_HTTP_SHORT_DELAY_MS)
                .then( _ => this.$http.put("/api/data/blah", angular.toJson(data)));
        }

        return httpPromise
            .then(({data}) => data)
            .catch(err => {
                this.$log.error(err);
                this.$q.reject("Unable to save data");
            });
    }
}

export { ISampleService, SampleService }