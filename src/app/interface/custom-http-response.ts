export interface CustomHttpResponse<T> {

    timestamp : Date;
    statusCode : string;
    status : string;
    message ?: string;
    reason ?: string;
    developerMessage ?: string;
    data ?: T;  

}
