var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();

var district = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
    .filter(ee.Filter.eq('name','Dehradun'));
print('Dehradun')

var input1 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                      .filterDate('2014-03-01','2014-05-01')
                      .filterBounds(district)
                      .sort('CLOUD_COVER')
                      .map(maskClouds)
                      .first());
print(input1.get('CLOUD_COVER'));

var input2 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                      .filterDate('2015-03-01','2015-05-01')
                      .filterBounds(district)
                      .sort('CLOUD_COVER')
                      .map(maskClouds)
                      .first());
print(input2.get('CLOUD_COVER'));

var input3 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                      .filterDate('2016-03-01','2016-05-01')
                      .filterBounds(district)
                      .sort('CLOUD_COVER')
                      .map(maskClouds)
                      .first());
print(input3.get('CLOUD_COVER'));

var input4 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                      .filterDate('2017-03-01','2017-05-01')
                      .filterBounds(district)
                      .sort('CLOUD_COVER')
                      .map(maskClouds)
                      .first());
print(input4.get('CLOUD_COVER'));

var input5 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                      .filterDate('2018-03-01','2018-05-01')
                      .filterBounds(district)
                      .sort('CLOUD_COVER')
                      .map(maskClouds)
                      .first());
print(input5.get('CLOUD_COVER'));
