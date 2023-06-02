export interface Rapid7{
    attribute: string;
    content: string;
}

/*export interface Rapid7{
    file: string;
    remediation_arn: string;
    key_arn: string;
    server_arn: string;
    num_groups: number;
    num_unique_keys: number;
    remediation_progress: number;
    risk_score: Risk_Score[];
    high_count: High_Count[];
}

interface High_Count {
    "IP Address": string;
    "Asset Name": string;
    Count: number;
    "Key Details": KeyDetails[];
}

interface KeyDetails{
    Key: string;
    Count: string;
} 

interface Risk_Score{
    "IP Address": string;
    "Asset Name": string;
    "CVSS2 Score": number;
    "Risk Score": number;
}*/