# Google Earth Engine

1. [cloudscore.js](./cloudscore.js) : To obtain the cloud score for a district for years 2014 to 2018

2. [cloudscoreanalysis.js](./cloudscoreanalysis.js) : To obtain the cloud score for a given set of districts for years 2014 to 2018 (Used for accounting the cloud cover in our analysis)

3. [current.js](./current.js) : Main js script being used to generate the BU/NBU classified images using CART classifier using the Goldblatt data

4. [downloadLandsat.js](./downloadLandsat.js) : To download the Landsat earth image for a district, which can then be converted to png file using [this](./tif2rgb.py) script.