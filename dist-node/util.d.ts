export interface AttributeObj {
    name: string;
    value: string;
}
export interface URLObj {
    reason: string;
    protocol: string;
    raw: string;
    encoded: string;
}
export interface AttributeFunction {
    (obj: URLObj): AttributeObj;
}
export interface Options {
    attributes?: Array<AttributeObj | AttributeFunction>;
    ips?: boolean;
    emails?: boolean;
    urls?: boolean;
    files?: boolean;
    truncate?: number | [number, number];
    defaultProtocol?: string | Function;
    list?: boolean;
    exclude?: (URLObj) => boolean;
}
/**
 *
 * Options defaulting function
 *
**/
export declare function defaultOptions(options: Options | undefined): Options;
/**
 *
 * Returns whether passed string
 * can be a valid port number or not
 *
**/
export declare function isPort(value: string): boolean;
