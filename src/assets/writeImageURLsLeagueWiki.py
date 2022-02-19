import urllib.request
from urllib.parse import quote
import requests
import json
import re
import os

IMAGE_WIDTH = "500"
SPECIAL_CHARS = "/_:"

#parts of the URL where the images are loaded from
BASE_URLpart1 = "https://static.wikia.nocookie.net/leagueoflegends/images/"
BASE_URLpart2 = "Skin.jpg/revision/latest/scale-to-width-down/" + IMAGE_WIDTH

#get a version of the string that works for the URLs given by league wiki
def getChampionURL(value):
    value = re.sub(r"\s+", '_', value)
    value = quote(value, safe = '')
    return value

def getSkinURL(value):
    if value == "Classic":
        return "Original"
    else:
        for char in SPECIAL_CHARS:
            value = value.replace(char, "")
            
        value = re.sub(r"\s+", '', value)
        return value
    
def findCorrectLink(cURL, sURL):
    for firstNumber in range(0, 15):
        for secondNumber in range(0, 255):
            firstHex = hex(firstNumber).split('x')[-1]
            secondHex = hex(secondNumber).split('x')[-1]
                
            imageURL = BASE_URLpart1 + firstHex + "/" + secondHex + "/" + championURL + "_" + skinURL + BASE_URLpart2
            response = requests.get(imageURL)
            
            if response.status_code == 200:
                return imageURL, True
                
    return "", False

if __name__ == "__main__":
    f = open('./resources/tierlist.json')
    data = json.load(f)
    champions = data["champions"]
    skinList = data["skinList"]
    
    imageURLDict = {}
    noURLFoundList = []
    
    for skinEntry in skinList[:50]:
        championURL = getChampionURL(skinEntry["champion"])
        skinURL = getSkinURL(skinEntry["skin"])
        key = skinEntry["champion"] + skinEntry["skin"]
        link, success = findCorrectLink(championURL, skinURL)
        
        #create missing image dirs for champions
        if not os.path.isdir('./images/champions/' + championURL):
            os.mkdir('./images/champions/' + championURL)
        
        #depending on success or failure, insert in the corresponding data structure
        if success:
            print("Success for " + key)
            imageURLDict[key] = link
        else:
            print("Failure for " + key)
            imageURLDict[key] = ""
            noURLFoundList.append(key)
            
    with open('./resources/links.json', 'w') as file:
        json.dump(imageURLDict, file)
        
    with open('./resources/missingLinks.json', 'w') as file:
        json.dump(noURLFoundList, file)
    
    #save image
    #urllib.request.urlretrieve("https://static.wikia.nocookie.net/leagueoflegends/images/3/33/Ahri_OriginalSkin.jpg", "images/test.jpg")
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    