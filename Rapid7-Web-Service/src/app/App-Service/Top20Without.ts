export interface Top20Without{
    attribute: string;
    content: RiskScore[];
}

interface RiskScore{
    "IP Address": string;
    "Asset Name": string;
    "CVSS2 Score": string;
    "Risk Score": string;
}