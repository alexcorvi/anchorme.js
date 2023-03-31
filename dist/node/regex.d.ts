export declare const email: string;
export declare const url: string;
export declare const file = "(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+";
export declare const final: string;
/**
export const final = `\\b((((((https?:|ftps?:)\\/\\/)?(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.])|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((https?:|ftps?:)\\/\\/)(\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]|((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)))(?!@\\w)(:(\\d{1,5}))?)|(((https?:|ftps?:)\\/\\/)\\S+))((((\\/(([a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#]+(\\/[a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#${nonLatinAlphabetRanges}]*)*))*?)?))?\\b((([a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#\\/${nonLatinAlphabetRanges}][a-z\\d\\-_~+=\\/${nonLatinAlphabetRanges}]+)))+))|(\\b((((https?:|ftps?:)\\/\\/)?(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((https?:|ftps?:)\\/\\/)(\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]|((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)))(?!@\\w)(:(\\d{1,5}))?)|(((https?:|ftps?:)\\/\\/)\\S+))(((\\/(([a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#]+(\\/[a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#]*)*))*?)?))?\\b(([\\/]?))+))|(\\b(mailto:)?([a-z0-9!#$%&'*+=?^_\`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_\`{|}~-]+)*)@(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\\b)|((file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+)\\b`;
*/
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
        TLD: number[];
        protocol: number[];
        ipv4: number;
        ipv6: number;
        ipv4Confirmation: number;
        byProtocol: number;
        port: number;
        protocolWithDomain: number;
        path: number;
        secondPartOfPath: number;
        query: number;
        fragment: number;
    };
};
export { iidxes };
