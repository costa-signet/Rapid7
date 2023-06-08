export interface Top20With {
    attribute: string;
    content: HighCount[];
}

interface HighCount{
    "IP Address": string;
    "Asset Name": string;
    "Count": number;
    "Key Details": KeyDetails[];
}

interface KeyDetails{
    "Key": string;
    "Count": number
}