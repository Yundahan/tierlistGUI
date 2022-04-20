# Tierlistgui

## Patch Cycle

Update Tierlist.xlsx

Execute excelToJson.py

Execute writeImageURLsCommunityDragon.py

Add missing skin names to skinNameMapping.json

Execute writeImageURLsCommunityDragon.py again

## Deploy to firebase

Open bash in folder /tierlistgui

Execute `ng build`

Execute `cd public`

Execute `firebase deploy`
