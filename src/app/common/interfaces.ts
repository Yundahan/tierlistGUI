export interface ISkin {
    champion: string,
    skin: string,
    tier: string,
    displayName?: string
}

export interface TierDict {
    [index: string]: number
}