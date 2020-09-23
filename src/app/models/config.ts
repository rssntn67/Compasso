export class Config {
    baseUrl:string;
    apiKey:string;

    constructor(baseUrl:string, apiKey:string) {
        this.apiKey=apiKey;
        this.baseUrl=baseUrl;
    }
}
