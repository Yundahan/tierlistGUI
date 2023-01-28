import json
from openpyxl import load_workbook

excel_file = 'resources/Tierlist.xlsx'
alphabet = 'BCDEFGHIJKLMNOPQRSTUVWXYZ'

def generateHexTierDict(sheet, startvalue, endvalue):
    hexTierDict = {}
    
    for i in range(startvalue, endvalue + 1):
        hexTierDict[sheet[alphabet[i - 1] + '2'].fill.start_color.index] = sheet[alphabet[i - 1] + '2'].value
        
    hexTierDict["00000000"] = "Not rated"
        
    return hexTierDict

def produceChampionList(sheet):
    championList = []
    
    for row in range(5, 1000):
        championCell = 'A' + str(row)
        
        if sheet[championCell].value == None:#there are no more champions
            return championList;
        
        championList.append(sheet[championCell].value)
        
    return championList#safety return (in case there are more than 1000 champions...)

def produceSkinList(sheet, hexTierDict):
    skinList = []
    
    for row in range(5, 1000):
        championCell = 'A' + str(row)
        
        if sheet[championCell].value == None:#there are no more champions
            return skinList;
        
        for column in alphabet:
            cell = column + str(row)
            
            if sheet[cell].value == None:#this champion has no more skins
                break
            
            color = sheet[cell].fill.start_color.index
            
            if not color in hexTierDict:#this color does not correspond to any tier
                print("Color " + color + " in " + str(row) + str(column) + " does not correspond to a tier")
                continue
            
            skinList.append({"champion": sheet[championCell].value,
                             "skin": sheet[cell].value,
                             "tier": hexTierDict[color]})
            
    return skinList#safety return (in case there are more than 1000 champions...)

if __name__ == "__main__":
    workbook = load_workbook(excel_file, data_only = True)
    worksheet = workbook['Tabelle1']

    hexTierDict = generateHexTierDict(worksheet, 1, 12)
    championList = produceChampionList(worksheet)
    skinList = produceSkinList(worksheet, hexTierDict)
    jsondata = {"tiers": list(hexTierDict.values()), "champions": championList, "skinList": skinList}
    
    with open('./resources/tierlist.json', 'w') as file:
        json.dump(jsondata, file, indent = 2)
        
    print("Json updated!")
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    