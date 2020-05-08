export interface BaseTokenProps {
    start: number;
    end: number;
    string: string;
}
export interface Email extends BaseTokenProps {
    isEmail: true;
    protocol: string;
    local: string;
    host: string;
}
export interface URL extends BaseTokenProps {
    isURL: true;
    protocol: string;
    host: string;
    port: string;
    ipv4: string;
    ipv6: string;
    confirmedByProtocol: boolean;
    path: string;
    query: string;
    fragment: string;
}
export interface File extends BaseTokenProps {
    isFile: true;
    filename: string;
    filePath: string;
    fileDirectory: string;
}
declare type TokenProps = Email & File & URL;
export declare type ListingProps = Partial<TokenProps> & BaseTokenProps;
export declare type DesiredValues = {
    [key: string]: string | undefined | true;
} | number | string | boolean;
export declare type TransformationOption<desiredValue> = desiredValue | ((string: string, props: Partial<ListingProps> & {
    string: string;
}) => desiredValue);
export interface Options {
    specialTransform: {
        test: RegExp;
        transform: (input: string, props: Partial<ListingProps> & {
            string: string;
        }) => string;
    }[];
    protocol: TransformationOption<string>;
    truncate: TransformationOption<number>;
    middleTruncation: TransformationOption<boolean>;
    exclude: TransformationOption<boolean>;
    attributes: TransformationOption<{
        [key: string]: string | undefined | true;
    }>;
}
export {};
