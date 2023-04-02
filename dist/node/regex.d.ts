export declare const email: string;
export declare const url: string;
export declare const file = "(file:\\/\\/\\/)(?:[a-z]+:(?:\\/|\\\\)+)?([\\w.]+(?:[\\/\\\\]?)+)+";
export declare const final: string;
export declare const finalRegex: RegExp;
export declare const ipRegex: RegExp;
export declare const emailRegex: RegExp;
export declare const fileRegex: RegExp;
export declare const urlRegex: RegExp;
declare const iidxes: {
    isFile: number;
    file: {
        fileName: number;
        protocol: number;
    };
    isEmail: number;
    email: {
        protocol: number;
        local: number;
        host: number;
    };
    isURL: number;
    url: {
        TLD: number[];
        protocol: number[];
        host: number[];
        ipv4: number;
        ipv6: number;
        byProtocol: number;
        port: number;
        protocolWithDomain: number;
        path: number;
        queryAndFragment: number;
    };
};
export { iidxes };
