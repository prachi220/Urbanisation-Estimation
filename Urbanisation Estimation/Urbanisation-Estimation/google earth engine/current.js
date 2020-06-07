// Load Rodrigo Principe's cloud masking module
var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();

//Loading India image, the extracting data for Haryana (a state in India) and then subsequently Ambala (a district in Haryana) 
var bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B10', 'B11'];
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry')
    .filter(ee.Filter.eq('Name','India'))
    .geometry();
var district = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
    .filter(ee.Filter.eq('name','Jaipur'));

// // FULL
// var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(india)
//     .filterDate('2014-01-01','2015-01-01')
//     .sort('CLOUD_COVER')
//     // .limit(500)
//     .map(maskClouds)
//     .median();
// var rajasthan_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(district)
//     .filterDate('2014-01-01','2015-01-01')
//     .sort('CLOUD_COVER')
//     // .limit(20)
//     .map(maskClouds)
//     .median();
    
// // PART-1
// var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(india)
//     .filterDate('2014-01-01','2014-07-01')
//     .sort('CLOUD_COVER')
//     // .limit(500)
//     .map(maskClouds)
//     .median();
// var rajasthan_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(district)
//     .filterDate('2014-01-01','2014-07-01')
//     .sort('CLOUD_COVER')
//     // .limit(20)
//     .map(maskClouds)
//     .median();

// // PART-2
// var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(india)
//     .filterDate('2014-07-01','2015-01-01')
//     .sort('CLOUD_COVER')
//     // .limit(500)
//     .map(maskClouds)
//     .median();
// var rajasthan_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(district)
//     .filterDate('2013-07-01','2014-01-01')
//     .sort('CLOUD_COVER')
//     // .limit(20)
//     .map(maskClouds)
//     .median();
    
// SUMMER
var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterBounds(india)
    .filterDate('2014-03-01','2014-09-01')
    .sort('CLOUD_COVER')
    // .limit(500)
    .map(maskClouds)
    .median();
var rajasthan_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterBounds(district)
    .filterDate('2015-03-01','2015-05-01')
    .sort('CLOUD_COVER')
    // .limit(20)
    .map(maskClouds)
    .median();
    
// // WINTER
// var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(india)
//     .filterDate('2014-09-01','2015-03-01')
//     .sort('CLOUD_COVER')
//     // .limit(500)
//     .map(maskClouds)
//     .median();
// var rajasthan_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     .filterBounds(district)
//     .filterDate('2013-12-01','2014-02-01')
//     .sort('CLOUD_COVER')
//     // .limit(20)
//     .map(maskClouds)
//     .median();
var input = rajasthan_image;
input = addBands(input.select(bands));
india_image = addBands(india_image);

//Loading the points from the fusion table and training the classifier
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
var ft_builtup = ft.filter(ee.Filter.eq('class',1));
var ft_nonbuiltup = ft.filter(ee.Filter.eq('class',2));
ft = ft_builtup.merge(ft_nonbuiltup);
var new_bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B10', 'B11','NDBI','NDVI'];
function addBands(image){
  var ndvi = image.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndbi = image.normalizedDifference(['B5', 'B4']).rename('NDBI');
  var ndwi = image.normalizedDifference(['B6', 'B6']).rename('NDWI');
  return image.addBands(ndvi).addBands(ndbi).addBands(ndwi);
}

// Load a Landsat 8 image to be used for prediction.
var training = india_image.sampleRegions(ft,['class'],30);
var trained = ee.Classifier.cart().train(training, 'class', new_bands);

Map.addLayer(input.clip(district));
input = input.clip(district);
input = input.classify(trained);
input = input.expression('LC==1?1:2',{'LC':input.select('classification')});
Map.addLayer(input.clip(district));

Export.image.toDrive({
  image: input.clip(district),
  description: 'Jaipur_summer_2014',
  maxPixels: 499295920080,
  scale: 30,
  region: district
});