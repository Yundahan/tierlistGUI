# Tierlistgui

## Patch Cycle

Update Tierlist.xlsx
Execute excelToJson.py
Execute writeImageURLsCommunityDragon.py
Add missing skin names to skinNameMapping.json
Execute writeImageURLsCommunityDragon.py again

## Deploy to firebase

Open bash in folder /tierlistgui
Execute command ng build
Copy contents from tierlistgui/dist/tierlistgui to tierlistgui/public
Execute command cd public
Execute command firebase deploy
