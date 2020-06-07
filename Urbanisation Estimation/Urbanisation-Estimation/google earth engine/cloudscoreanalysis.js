var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();

// Assam
// var district_list = ['Kokrajhar', 'Dhubri', 'Goalpara', 'Bongaigaon', 'Barpeta', 'Kamrup', 'Nalbari', 'Darrang', 'Morigaon', 'Nagaon', 'Sonitpur', 'Lakhimpur', 'Dhemaji', 'Tinsukia', 'Dibrugarh', 'Jorhat', 'Golaghat', 'Karbi Anglong', 'Dima Hasao', 'Cachar', 'Karimganj', 'Hailakandi'];
// Bihar
// var district_list = ['Pashchim Champaran', 'Purba Champaran', 'Sheohar', 'Sitamarhi', 'Madhubani', 'Supaul', 'Araria', 'Kishanganj', 'Purnia', 'Katihar', 'Madhepura', 'Saharsa', 'Darbhanga', 'Muzaffarpur', 'Gopalganj', 'Siwan', 'Saran', 'Vaishali', 'Samastipur', 'Begusarai', 'Khagaria', 'Bhagalpur', 'Banka', 'Munger', 'Lakhisarai', 'Sheikhpura', 'Nalanda', 'Patna', 'Bhojpur', 'Buxar', 'Kaimur', 'Rohtas', 'Jehanabad', 'Aurangabad', 'Gaya', 'Nawada', 'Jamui'];
// Chhattisgarh
// var district_list = ['Koriya', 'Surguja', 'Jashpur', 'Raigarh', 'Korba', 'Janjgir-Champa', 'Bilaspur', 'Rajnandgaon', 'Durg', 'Raipur', 'Mahasamund', 'Dhamtari', 'Bastar', 'Dantewada'];
// Jharkhand
// var district_list = ['Garhwa', 'Palamu', 'Chatra', 'Hazaribagh', 'Kodarma', 'Giridih', 'Deoghar', 'Godda', 'Sahibganj', 'Dumka', 'Dhanbad', 'Bokaro', 'Ranchi', 'Lohardaga', 'Gumla', 'Pashchimi Singhbhum', 'Purbi Singhbhum'];
// Odisha
// var district_list = ['Bargarh', 'Jharsuguda', 'Sambalpur', 'Debagarh', 'Sundargarh', 'Kendujhar', 'Mayurbhanj', 'Baleshwar', 'Bhadrak', 'Kendrapara', 'Jagatsinghapur', 'Cuttack', 'Jajapur', 'Dhenkanal', 'Anugul', 'Nayagarh', 'Khordha', 'Puri', 'Ganjam', 'Gajapati', 'Kandhamal', 'Subarnapur', 'Balangir', 'Nuapada', 'Kalahandi', 'Rayagada', 'Nabarangapur', 'Koraput', 'Malkangiri'];
// Madhya Pradesh
// var district_list = ['Sheopur', 'Morena', 'Bhind', 'Gwalior', 'Datia', 'Shivpuri', 'Guna', 'Tikamgarh', 'Chhatarpur', 'Panna', 'Sagar', 'Damoh', 'Satna', 'Rewa', 'Umaria', 'Shahdol', 'Sidhi', 'Neemuch', 'Mandsaur', 'Ratlam', 'Ujjain', 'Shajapur', 'Dewas', 'Jhabua', 'Dhar', 'Indore', 'West Nimar', 'Barwani', 'East Nimar', 'Rajgarh', 'Vidisha', 'Bhopal', 'Sehore', 'Raisen', 'Betul', 'Harda', 'Hoshangabad', 'Katni', 'Jabalpur', 'Narsimhapur', 'Dindori', 'Mandla', 'Chhindwara', 'Seoni', 'Balaghat'];
// Rajasthan
// var district_list = ['Ganganagar', 'Hanumangarh', 'Bikaner', 'Churu', 'Jhunjhunun', 'Alwar', 'Bharatpur', 'Dhaulpur', 'Karauli', 'Sawai Madhopur', 'Dausa', 'Jaipur', 'Sikar', 'Nagaur', 'Jodhpur', 'Jaisalmer', 'Barmer', 'Jalor', 'Sirohi', 'Pali', 'Ajmer', 'Tonk', 'Bundi', 'Bhilwara', 'Rajsamand', 'Udaipur', 'Dungarpur', 'Banswara', 'Chittaurgarh', 'Kota', 'Baran', 'Jhalawar'];
// Uttar Pradesh
// var district_list = ['Saharanpur', 'Muzaffarnagar', 'Bijnor', 'Moradabad', 'Rampur', 'Amroha', 'Meerut', 'Baghpat', 'Ghaziabad', 'Gautam Buddha Nagar', 'Bulandshahr', 'Aligarh', 'Hathras', 'Mathura', 'Agra', 'Firozabad', 'Etah', 'Mainpuri', 'Budaun', 'Bareilly', 'Pilibhit', 'Shahjahanpur', 'Lakhimpur Kheri', 'Sitapur', 'Hardoi', 'Unnao', 'Lucknow', 'Rae Bareli', 'Farrukhabad', 'Kannauj', 'Etawah', 'Auraiya', 'Kanpur Dehat', 'Kanpur Nagar', 'Jalaun', 'Jhansi', 'Lalitpur', 'Hamirpur', 'Mahoba', 'Banda', 'Chitrakoot', 'Fatehpur', 'Pratapgarh', 'Kaushambi', 'Allahabad', 'Barabanki', 'Faizabad', 'Ambedkar Nagar', 'Sultanpur', 'Bahraich', 'Shravasti', 'Balrampur', 'Gonda', 'Siddharth Nagar', 'Basti', 'Sant Kabir Nagar', 'Maharajganj', 'Gorakhpur', 'Kushinagar', 'Deoria', 'Azamgarh', 'Mau', 'Ballia', 'Jaunpur', 'Ghazipur', 'Chandauli', 'Varanasi', 'Mirzapur', 'Sonbhadra'];
// Uttarakhand
// var district_list = ['Uttarkashi', 'Chamoli', 'Rudraprayag', 'Tehri Garhwal', 'Dehradun', 'Garhwal', 'Pithoragarh', 'Bageshwar', 'Almora', 'Champawat', 'Nainital', 'Udham Singh Nagar', 'Hardwar'];


var year_list = new Array('14','15','16','17','18');
var district, year, image, cloudcover;
var output = new Array(district_list.length);

for (var d in district_list){
  district = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
    .filter(ee.Filter.eq('name',district_list[d]));
  cloudcover = new Array(5);
  
  for (var i in year_list){
    year = year_list[i];
    image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                        .filterDate('20' + year + '-03-01','20' + year + '-05-01')
                        .filterBounds(district)
                        .sort('CLOUD_COVER')
                        .map(maskClouds)
                        .first());
    // print(input.get('CLOUD_COVER'));
    cloudcover[i] = image.get('CLOUD_COVER');
  }
  cloudcover.unshift(district_list[d]);
  output[d] = cloudcover;
}

print(output);
output = ee.List(output) // Cast valuesList

// var myFeatures = ee.FeatureCollection(output.map(function(el){
//   el = ee.List(el) // cast every element of the list
//   var geom = ee.Geometry.MultiPoint([ee.Number(el.get(1)), ee.Number(el.get(2)), ee.Number(el.get(3)), ee.Number(el.get(4)), ee.Number(el.get(5))])
//   return ee.Feature(geom, {'District':(el.get(0))})
// }))

// Export.table.toDrive({
//   collection: myFeatures, 
//   description: 'uttarakhand',
//   fileFormat: 'CSV', 
// });

print(output);
// Export.table.toDrive({
//   collection: output,
//   description: 'assam',
//   fileFormat: 'CSV'
// });

