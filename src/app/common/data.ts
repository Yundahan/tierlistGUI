import { TierDict } from "./interfaces"

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

export const tierToColor = {
    'SS': 'red',
    'S': 'orange',
    'A': 'gold',
    'B': 'greenyellow',
    'hohes C': 'lawngreen',
    'C': 'limegreen',
    'D': 'mediumseagreen',
    'E': 'mediumturquoise',
    'F': 'dodgerblue',
    'F-': 'royalblue',
    'Mitleids-SS': 'purple',
    'AYAYA': 'fuchsia',
    'Not rated': 'grey'
}