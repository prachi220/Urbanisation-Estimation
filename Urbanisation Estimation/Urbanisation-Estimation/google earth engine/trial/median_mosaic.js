// Load Rodrigo Principe's cloud masking module
var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();

//Loading India image, the extracting data for Haryana (a state in India) and then subsequently Ambala (a district in Haryana) 
var bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B10', 'B11'];
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry')
    .filter(ee.Filter.eq('Name','India'))
    .geometry();
var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterBounds(india)
    .filterDate('2017-02-01','2017-09-01')
    .sort('CLOUD_COVER')
    // .limit(500)
    .map(maskClouds)
    .median();
var district = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
    .filter(ee.Filter.eq('name','Gurgaon'));
var haryana_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterBounds(district)
    .filterDate('2017-02-01','2017-09-01')
    .sort('CLOUD_COVER')
    // .limit(20)
    .map(maskClouds)
    .median();
var input = haryana_image;
input = addBands(input.select(bands));
india_image = addBands(india_image);

//Loading the points from the fusion table and training the classifier
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
var ft_builtup = ft.filter(ee.Filter.eq('class',1)).limit(1200);
var ft_nonbuiltup = ft.filter(ee.Filter.eq('class',2)).limit(1800);
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
input = input.expression('LC==1?1:0',{'LC':input.select('classification')});
Map.addLayer(input.clip(district));

// // Display input images with and without cloud masking.

// // Display the input images for 2014 - 2017
// var unmaskedImages = ee.List.sequence(2014, 2017).map(function(year) {
//     var startDate = ee.Date.fromYMD(year, 2, 1);
//     var endDate = ee.Date.fromYMD(year, 4, 1);

//     var image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//         .filterBounds(district)
//         .filterDate(startDate, endDate)
//         .sort('CLOUD_COVER')
//         .limit(4)
//         .mosaic()
//         .clip(district);
//     return image;
// });

// // Mask images before mosaicking
// var maskedImages = ee.List.sequence(2014, 2017).map(function(year) {
//     var startDate = ee.Date.fromYMD(year, 2, 1);
//     var endDate = ee.Date.fromYMD(year, 4, 1);

//     var image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//         .filterBounds(district)
//         .filterDate(startDate, endDate)
//         .sort('CLOUD_COVER')
//         .map(maskClouds)
//         // .limit(4)
//         .mosaic()
//         .clip(district);
//     return image;
// });

// // Calculate simple cloud score and use that for quality mosaic
// var qualityMosaickedImages = ee.List.sequence(2014, 2017).map(function(year) {
//     var startDate = ee.Date.fromYMD(year, 2, 1);
//     var endDate = ee.Date.fromYMD(year, 4, 1);

//     var image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//         .filterBounds(district)
//         .filterDate(startDate, endDate)
//         .map(function(image) {
//             return image.addBands(ee.Image(100).subtract(ee.Algorithms.Landsat.simpleCloudScore(image)))
//         })
//         .qualityMosaic('cloud')
//         .clip(district);
//     return image;
// });

// // Use built in simple composite
// var simpleCompositeImages = ee.List.sequence(2014, 2017).map(function(year) {
//     var startDate = ee.Date.fromYMD(year, 2, 1);
//     var endDate = ee.Date.fromYMD(year, 4, 1);

//     var images = ee.ImageCollection('LANDSAT/LC08/C01/T1')
//         .filterBounds(district)
//         .filterDate(startDate, endDate)

//     var image = ee.Algorithms.Landsat.simpleComposite(images)
//         .clip(district);
//     return image;
// });

// // Take the median value
// var medianImages = ee.List.sequence(2014, 2017).map(function(year) {
//     var startDate = ee.Date.fromYMD(year, 2, 1);
//     var endDate = ee.Date.fromYMD(year, 4, 1);

//     var image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//         .filterBounds(district)
//         .filterDate(startDate, endDate)
//         .sort('CLOUD_COVER')
//         // .limit(4)
//         .map(maskClouds)
//         .median()
//         .clip(district);
//     return image;
// });

// var vis = {
//     bands: 'B4,B3,B2',
//     gain: 500.0,
//     // max: 3000.0,
//     // min: 0,
// };

// for (var i = 0; i < 4; i++) {
//     var year = 2014 + i;
//     var shouldDisplay = i === 1;
//     Map.addLayer(ee.Image(medianImages.get(i)), vis, 'Median: ' + year, shouldDisplay);
// }

// for (var i = 0; i < 4; i++) {
//     var year = 2014 + i;
//     var shouldDisplay = i === 1;
//     var simpleVis = {
//         bands: 'B4,B3,B2',
//         // gain: 500.0,
//         max: 100,
//         min: 0,
//     };
//     Map.addLayer(ee.Image(simpleCompositeImages.get(i)), simpleVis, 'Simple Composite: ' + year, shouldDisplay);
// }

// for (var i = 0; i < 4; i++) {
//     var year = 2014 + i;
//     var shouldDisplay = i === 1;
//     Map.addLayer(ee.Image(qualityMosaickedImages.get(i)), vis, 'Quality Mosaicked: ' + year, shouldDisplay);
// }

// for (var i = 0; i < 4; i++) {
//     var year = 2014 + i;
//     var shouldDisplay = i === 1;
//     Map.addLayer(ee.Image(maskedImages.get(i)), vis, 'Masked: ' + year, shouldDisplay);
// }

// for (var i = 0; i < 4; i++) {
//     var year = 2014 + i;
//     var shouldDisplay = i === 1;
//     Map.addLayer(ee.Image(unmaskedImages.get(i)), vis, 'Non-masked: ' + year, shouldDisplay);
// }