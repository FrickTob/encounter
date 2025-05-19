
// 1 = easy, 2 = medium, 3 = hard, 4 = deadly
export const getXPThreshFromLevel = (type, level) => {
    const xpTable = {
        1:  { easy: 25,   medium: 50,   hard: 75,   deadly: 100 },
        2:  { easy: 50,   medium: 100,  hard: 150,  deadly: 200 },
        3:  { easy: 75,   medium: 150,  hard: 225,  deadly: 400 },
        4:  { easy: 125,  medium: 250,  hard: 375,  deadly: 500 },
        5:  { easy: 250,  medium: 500,  hard: 750,  deadly: 1100 },
        6:  { easy: 300,  medium: 600,  hard: 900,  deadly: 1400 },
        7:  { easy: 350,  medium: 750,  hard: 1100, deadly: 1700 },
        8:  { easy: 450,  medium: 900,  hard: 1400, deadly: 2100 },
        9:  { easy: 550,  medium: 1100, hard: 1600, deadly: 2400 },
        10: { easy: 600,  medium: 1200, hard: 1900, deadly: 2800 },
        11: { easy: 800,  medium: 1600, hard: 2400, deadly: 3600 },
        12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
        13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
        14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
        15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
        16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
        17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
        18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
        19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
        20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
    };
    const parsedLevel = Number(level)
    if (isNaN(parsedLevel)) return 0; // Invalid level
    if (parsedLevel < 1 || parsedLevel > 20) return 0; // Invalid level
    if (type === 1) return xpTable[parsedLevel].easy;
    if (type === 2) return xpTable[parsedLevel].medium;
    if (type === 3) return xpTable[parsedLevel].hard;
    if (type === 4) return xpTable[parsedLevel].deadly;
    
    return xpTable[parsedLevel].easy;
}

export const getXPThreshFromCR = (cr) => {
    const xpTable = {
            0: 0,
            .125: 25,
            .25: 50,
            .5: 100,
            1: 200,
            2: 450,
            3: 700,
            4: 1100,
            5: 1800,
            6: 2300,
            7: 2900,
            8: 3900,
            9: 5000,
            10: 5900,
            11: 7200,
            12: 8400,
            13: 10000,
            14: 11500,
            15: 13000,
            16: 15000,
            17: 18000,
            18: 20000,
            19: 22000,
            20: 25000,
            21: 33000,
            22: 41000,
            23: 50000,
            24: 62000,
            25: 75000,
            27: 105000,
            28: 120000,
            29: 135000,
            30: 155000,
        }

    const split = String(cr).split('/')
    let convertedCr = Number(cr)
    if (split.length > 1) {
        convertedCr = Number(split[0]) / Number(split[1])
        if (isNaN(convertedCr)) return 0; // Invalid CR
    }
    if (convertedCr < 0 || convertedCr > 30) return 0; // Invalid CR
    if (xpTable[convertedCr]) return xpTable[convertedCr];
    return 0; // CR not found in table
}

export const getCRFromXP = (xp) => {
    const xpTable = {
        0: 0,
        25: .125,
        50: .25,
        100: .5,
        200: 1,
        450: 2,
        700: 3,
        1100: 4,
        1800: 5,
        2300: 6,
        2900: 7,
        3900: 8,
        5000: 9,
        5900: 10,
        7200: 11,
        8400: 12,
        10000: 13,
        11500: 14,
        13000: 15,
        15000: 16,
        18000: 17,
        20000: 18,
        22000: 19,
        25000:20,
        33000: 21,
        41000: 22,
        50000: 23,
        62000: 24,
        75000: 25,
        105000: 27,
        120000: 28,
        135000: 29,
        155000: 30,
    }
    if (xpTable[xp]) return xpTable[xp];
    return 0; // XP not found in table
}

export const multiplyByMultiplier = (xp,numMonsters) => {
    if (numMonsters === 1) return xp
    if (numMonsters < 3) return Math.floor(xp * 1.5);
    if (numMonsters < 7) return Math.floor(xp * 2)
    if (numMonsters < 11) return Math.floor(xp * 2.5);
    if (numMonsters < 15) return Math.floor(xp * 3);
    if (numMonsters >= 15) return Math.floor(xp * 4);
    return 0;
}