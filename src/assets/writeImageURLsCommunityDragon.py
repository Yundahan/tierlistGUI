import requests
import json

CHAMPION_DATA_URL = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champions/"
SKIN_IMAGE_URL = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/characters/"
SKIN_DATA_URL = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/skins.json"
CHAMPION_SUMMARY_URL = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"

#get the communitydragon ID of every champion
def getChampionToIdDict():
    response = requests.get(CHAMPION_SUMMARY_URL)
    data = response.json()
    del data[0]
    championToId = {}
    
    for champion in data:
        name = champion["name"]
        
        #special case Bullshit Nunu
        if name == "Nunu & Willump":
            name = "Nunu"
            
        championToId[name] = champion["id"]
        
    return championToId

#get the image IDs for every skin ID
def getSkinIDToImageIDDict():
    response = requests.get(SKIN_DATA_URL)
    data = response.json()
    
    return data

#get the communitydragon ID of every skin
def getSkinToIdDict(championName, championData):
    skins = championData["skins"]
    skinToId = {}
    
    for skin in skins:
        skinName = skin["name"]
        
        #special case Classic Skins
        if skin["isBase"]:
            skinName = "Classic " + championName
        #special case Project Skins
        if "PROJECT: " in skinName:
            skinName = skinName.replace(":", "")
        #special case skin names that include the champion name first
        if skinName.find(championName) == 0:
            skinName = skinName + " " + championName
        #special case Bullshit Nunu
        if " & Willump" in skinName:
            skinName = skinName.replace(" & Willump", "")
            
        skinToId[skinName] = skin["id"]
            
    return skinToId

#print the skins from the tierlist that do not exist under the same name in the URLdict
def updateSkinNameMappingFile(URLdict):
    f = open('resources/tierlist.json')
    tierlist = json.load(f)
    f = open('resources/skinNameMapping.json')
    missingSkins = json.load(f)
    newMissing = []
    skinList = tierlist["skinList"]
    
    for skin in skinList:
        tierlistSkinName = skin["skin"] + " " + skin["champion"]
        
        if not (skin["champion"] in URLdict and tierlistSkinName in URLdict[skin["champion"]]) and not tierlistSkinName in missingSkins:
            missingSkins[tierlistSkinName] = ""
            newMissing.append(tierlistSkinName)
            
    print("Missing skins: ")
    print(newMissing)
            
    with open('resources/skinNameMapping.json', 'w') as file:
        json.dump(missingSkins, file, indent = 2)
        
def buildURL(skinIDToImageIDDict, skinID):
    uncenteredSplashPath = skinIDToImageIDDict[skinID]["uncenteredSplashPath"]
    restPath = uncenteredSplashPath.split("Characters/", 1)[1]
    return SKIN_IMAGE_URL + restPath.lower()

if __name__ == "__main__":
    f = open('resources/imageURLsCommunityDragon.json')
    URLdict = json.load(f)
    championToId = getChampionToIdDict()
    skinIDToImageIDDict = getSkinIDToImageIDDict()
    
    for championName in championToId:
        championID = str(championToId[championName])
        response = requests.get(CHAMPION_DATA_URL + championID + ".json")
        championData = response.json()
        skinToId = getSkinToIdDict(championName, championData)
        
        #create new dictionary entry for champion if necessary
        if not championName in URLdict:
            URLdict[championName] = {}
            
        for skinName in skinToId:
            #if skin is already contained in the dictionary, don't add it again (might overwrite manual corrections)
            if (not skinName in URLdict[championName]) or len(URLdict[championName][skinName]) == 0:
                skinID = str(skinToId[skinName])
                URL = buildURL(skinIDToImageIDDict, skinID)
                URLdict[championName][skinName] = URL
                
    print("URLdict generated!")
    
    updateSkinNameMappingFile(URLdict)
    
    with open('resources/imageURLsCommunityDragon.json', 'w') as file:
        json.dump(URLdict, file, indent = 2)





















