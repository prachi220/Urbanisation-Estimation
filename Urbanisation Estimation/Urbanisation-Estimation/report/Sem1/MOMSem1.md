# MOMs

**17/09/2018 - 21/09/2018** 

   * We worked on creating a composite by selecting the pixel from the least cloudy scene by taking median of all available pixels.I have attached the results for Gurgaon and Ambala with the mail. The results we're getting with median are quite different from the usual mosaic that we were earlier using, but we couldn't possibly figure out what to interpret from that and which one is working better for us. <a href="https://docs.google.com/document/d/1oJyeQWso19SU4pRA8021PtVh1PDpQMqKeJLcbr3ulw4/edit?usp=sharing">Link</a>

   * Also we met Dibyajyoti and he showed us the census data that he has available for 2011. We had two issues with that-
      1. We are working for 2014-2017 images, but the latest census data is for 2011. 
      2. There were no parameters in the data related to health or urbanisation. Although he told us that he has Modis data for these years which have district/village labels for built-up and non built up. Maybe we can use something like that for validation of our results.

   * Lastly we have also started working on looking at the pixel wise classification into built-up and non built-up, but we were having some issues with the exporting our classified image as .tiff file and retrieving data from it using the PIL library we had found code for at online. We went ahead and met Arpit since he has been working on GEE. He has given us the scripts he was using for reading the files. We will show you results for the same in our next meeting.

   **Feedback**

   * By mosaic you mean that earlier you were selecting the landsat image with the least cloud cover? And now you are trying to select the pixel with the least cloud cover? It's interesting that there is a difference in these two approaches, possibly showing that there is some spatial averaging or spillover that happens within landsat pixels. 

   * I am also wondering if there is some way in which we can improve this by looking at not just the median for each pixel, but consider the median from a set of neighbouring pixels to bring in spatial continuity, ie. for a given pixel select the landsat image which has the least cloud cover among the set of pixels within a certain radius from this pixel. Similarly, even for the BU/NBU classification, taken an ensemble like approach by classifying each pixel based not just on what is predicted for it but predicted for other pixels within a certain radius. This will result in a sort of spatial smoothing and might help. 

   * I think rather than census data, you could get NHFS data from Bipul. That is from 2012-14, at the district level. 

   * Can you btw also check out the worldpop dataset. They have built population estimates of the number of people in each pixel, I think the resolution is at 300m or 500m. Can you see if this data is available over time, or for just one year? If only for a particular year then one approach could be to build a deep learning model using one of the Imagenet architectures to predict the Worldpop population using Landsat data. This could give a model for urbanization possibly.



**24/09/2018 - 28/09/2018**

   * Taking the model training and classification offline
   * Spatial Smoothening by considering median of neighbours
   * Worldpop data for population estimation for neighbours

**01/10/2018 - 05/10/2018**

   * No meeting

**08/10/2018 - 12/10/2018**

   * alpha(B) beta(NB)- marking points on a plane and seeing matters 
   * RGB - red and blue, blue and green (might not work)
   * increasing resolution of area we are considering modis as groundtruth check modis using out prev method
