import json

IMAGE_SIZE = "500"
URLEnding = ".jpg/revision/latest/scale-to-width-down/" + IMAGE_SIZE

def generateMissingEntries(URLdict):
    f = open('./resources/tierlist.json')
    data = json.load(f)
    skinList = data["skinList"]
    URLdict = {}
    
    for skin in skinList:
        championName = skin["champion"]
        skinName = skin["skin"]
        
        if not championName in URLdict:
            URLdict[championName] = {}
        
        if (not skinName in URLdict[championName]) or len(URLdict[championName][skinName]) > 0:
            URLdict[championName][skinName] = ""
        
    with open('resources/emptyLeagueWikiURLs.json', 'w') as outfile:
        json.dump(URLdict, outfile, indent = 2)
        
def correctFaultyEntries(URLdict):
    for championName in URLdict:
        for skinName in URLdict[championName]:
            if len(URLdict[championName][skinName]) > 0:
                URLdict[championName][skinName] = URLdict[championName][skinName].split(".jpg", 1)[0] + URLEnding
        
    with open('resources/emptyLeagueWikiURLs.json', 'w') as outfile:
        json.dump(URLdict, outfile, indent = 2)

if __name__ == "__main__":
    f = open('resources/emptyLeagueWikiURLs.json')
    URLdict = json.load(f)
    
    generateMissingEntries(URLdict)
    correctFaultyEntries(URLdict)
        
        