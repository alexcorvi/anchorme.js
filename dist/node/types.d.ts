export interface TokenProps {
    start: number;
    end: number;
    string: string;
}
export declare type DesiredValues = {
    [key: string]: string | undefined | true;
} | number | string | boolean;
export declare type TransformationOption<desiredValue> = desiredValue | ((props: string) => desiredValue);
export interface Options {
    specialTransform: {
        test: RegExp;
        transform: (input: string) => string;
    }[];
    protocol: TransformationOption<string>;
    truncate: TransformationOption<number>;
    middleTruncation: TransformationOption<boolean>;
    exclude: TransformationOption<boolean>;
    attributes: TransformationOption<{
        [key: string]: string | undefined | true;
    }>;
}
