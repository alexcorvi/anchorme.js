export declare const email: string;
export declare const url: string;
export declare const file = "(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+";
export declare const final: string;
export declare const finalRegex: RegExp;
export declare const ipRegex: RegExp;
export declare const emailRegex: RegExp;
export declare const fileRegex: RegExp;
export declare const urlRegex: RegExp;
declare const iidxes: {
    isURL: number;
    isEmail: number;
    isFile: number;
    file: {
        fileName: number;
        protocol: number;
    };
    email: {
        protocol: number;
        local: number;
        host: number;
    };
    url: {
        ipv4: number;
        ipv6: number;
        ipv4Confirmation: number;
        byProtocol: number;
        port: number;
        protocol1: number;
        protocol2: number;
        protocol3: number;
        protocolWithDomain: number;
        path: number;
        secondPartOfPath: number;
        query: number;
        fragment: number;
    };
};
export { iidxes };
