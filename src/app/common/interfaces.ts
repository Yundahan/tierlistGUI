export interface ISkin {
    champion: string,
    skin: string,
    tier: string
}

export interface TierDict {
    [index: string]: number
}

export const tierDict: TierDict = {
    'SS': 0,
    'S': 1,
    'A': 2,
    'B': 3,
    'hohes C': 4,
    'C': 5,
    'D': 6,
    'E': 7,
    'F': 8,
    'F-': 9,
    'Mitleids-SS': 10,
    'AYAYA': 11,
    'Not rated': 12
}

export const tiers = [
    'SS',
    'S',
    'A',
    'B',
    'hohes C',
    'C',
    'D',
    'E',
    'F',
    'F-',
    'Mitleids-SS',
    'AYAYA',
    'Not rated'
]