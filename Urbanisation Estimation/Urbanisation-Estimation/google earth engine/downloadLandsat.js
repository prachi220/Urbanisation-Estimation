var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();

var district = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
    .filter(ee.Filter.eq('name','Gurgaon'));

var district_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterBounds(district)
    .filterDate('2015-03-01','2015-05-01')
    .sort('CLOUD_COVER')
    // .limit(20)
    .map(maskClouds)
    .median();

print(district_image);

Map.addLayer(district_image.clip(district), {bands: ['B4', 'B3', 'B2'], max: 0.4}, '3bands');

var new_image = district_image.select(
    ['B4', 'B3', 'B2'], // old names
    ['B4', 'B3', 'B2']  // new names
);

Export.image.toDrive({
  image: new_image.clip(district),
  description: 'landsatImageGurgaon1',
  scale: 30,
  maxPixels: 1e9,
  region: district
});