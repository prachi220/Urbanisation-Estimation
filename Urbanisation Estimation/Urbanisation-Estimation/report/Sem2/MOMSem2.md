# MOMs

**02/01/2019 - 14/01/2019**

   * Analyse if the results of classification are actually genuine, and not all the non-noisy points are zero gradient (builtup->builtup or nbu->nbu).
      We identified that the classification has a few issues, like for first half of the year, classification marks some regions as nbu, which are bu for the second half of each year. This actually gives a wiggle sequence of nbu to bu to nbu, which might actually give a zero or positive gradient, and be marked as non-noisy. We feel that this might be because of the extra cloud cover in the winter months (first half of the year). We are trying to now figure out ways to eliminate this, which might actually lead us to using the nightlight approach.

   * Look for papers on contribution of mass media in health statistics and figure out a way to extract the relevant ones and index them (quntify them) in a suitable manner.
      We found a [paper](./papers/MassMedia.pdf) doing sentiment analysis on tweets and giving out stats in some way. There's another reference to a <a href="https://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/">python library</a> which uses an API tweepy and textblob.

   * Try to run the classification with all of Goldblatt's points instead of just a fraction since the skewed ratio of bu:nbu has been done on purpose.
      The classification does run successfully on the complete dataset, but it gives an error of "computation timed out" on rendering it over the google earth image.

**15/01/2019 - 29/01/2019**

   * Improve the bu-nbu classification due to the errors in current classification which leaves west Gurgaon as nbu for first six months and bu for the next six. This could be due to the excessive cloud cover/smog in the winter months.
      1. Use only a few months which have minimal cloud cover
      2. Find a suitable urbanisation index for a district which could be:
         - Fraction of bu points
         - Address the unevenness/density. Try to model this unevenness in the image by running a convolutional filter, get a distribution number and find the genie coefficient
         - Find the standard deviation/variance of the distribution of these squares
         - Read about blob detection and make a distibution based on the blob sizes
      3. Run the Goldblatt classifier on smaller regions and manually check if the classification is accurate
      4. Use it month wise (April and November?). Try to run it for places like Rajasthan or south India which donot see extreme winters and consolidate results for that, North India vs South India
      5. Consolidate and prepare a short writeup revolving around this, on how to quantify it, and it could be used with NHFS data

   * For mass media, consult with another group working on this and then maybe use the data district wise for validation and prediction

**30/01/2019 - 12/02/2019**

   * Try to find a relevant index for urbanisation using different score schemes based on bu-nbu classification for the years and measures
   
   * For different districts, experiment with the months periods for training and testing both, to identify the issues and the best fit results that can be generalised. Consolidate all the results as much as possible to draw a fine comparision/analysis

   * Try to fetch health data from the website using scraping tools for web and pdf

**13/02/2019 - 19/02/2019**

   * Nightlights :
      1. Analyse the movement of nightlights across years to identify the patterns based on the gradient (flatline, positive or negative) and find the correlation between this pattern and the urbanisation pattern from the classification
      2. Maybe use the nightlight values for improving the scoring function in the spatial smoothing component

   * Urbanisation Index : 
      1. Identify the reliable points by elimination the unreliable points, which are based on high residual around the regression line (score function) and high negative slopes
      2. Use the weighted sum of slopes/values of reliable points
      3. Use multiple components:
         * Amount of urbanisation
         * Rate of urbanisation
         * Spatial Distribution of urbanisation (Blob detection, use the size of the largest blob?)
         * Rate of change (increase?) in the size of the largest blob

   * Shift to VM for experimentation and extend it to more districts asap

**20/02/2019 - 18/03/2019**

   * Look at the histogram of residuals for different strategies
   * Amount of urbanisation = % of BU and NBU points in reliable set

**29/03/2019 - 02/04/2019**

   * Look for standard smoothing filters, like gaussian and convolution
   * Consider all the points under the reliability counts and fix a thresholding value
   * Fix the pipeline and extend it to different districts
   * Manually code up blob detection, and use scaled down images (one-tenth?) 

**03/04/2019 - 09/04/2019**

   * Urbanisation Analysis :
      1. Normalise the costs to get an actual idea of the error values
      2. Check for the cloud cover index of the original landsat images, to verify the high cloud cover in 2016 images
      3. Try to vary the convolution mask size for varied smoothing, and check for errors
      4. Try to map the points from CDF plot to the corresponding pixels on image, to identify which zones of plots belong to which region of the district, like peripheral, mostly unhabitated area or the densely builtup region. This could then further be used to see if the error plots can actually deduce the distribution of habitation in a district (sparse vs dense, cluttered vs clustered). This error plot analysis along with the actual classification can help improving the classification results for a district

   * Blob Detection :
      1. Extend the analysis to a few more districts
      2. Use Herfindahl Index (HHI) to analyse the urbanisation distribution patterns in different districts
      3. Try to overlay the boundaries of blobs on actual google images, to delineate the urban regions
      4. For later, we will see if a single blob is actually two dense blobs connected by a link, and if over time, we see that thin link expanding (could actually explain development patterns)

**10/04/2019 - 16/04/2019**

   * Find a proper way to reason out the three sections of the CDF plot, wrt the regions in the district
   * Finalise the smoothing mask size to 5x5
   * For blobs, visually paint a few major blobs and see how many should be taken into consideration for the calculation of HHI
   * For cloud cover scores, some values are as follows:
      
      - Before sorting based on CLOUD_COVER : (and then using .first())
      
         | Year   |  Jaipur  |  Gurgaon  |  Ambala  |  Chandigarh  |  Dehradun  |   Pune   |
         | ------ | -------- | --------- | -------- | ------------ | ---------- | -------- |
         | 2014   |   8.69   |    5.08   |   7.69   |    18.59     |   23.12    |   0.02   |
         | 2015   |**34.32** | **14.92** |**48.35** |    16.74     | **50.19**  |**20.32** |
         | 2016   |   1.02   |    8.45   |  29.72   |  **45.54**   |   44.40    |   1.01   |
         | 2017   |   0.76   |    0.01   |   7.12   |     0.86     |    7.42    |      0   |
         | 2018   |   5.73   |    0.01   |   1.75   |    35.96     |    3.14    |   0.28   |

      - After sorting based on CLOUD_COVER : (and then using .first())
      
         | Year   |  Jaipur  |  Gurgaon  |  Ambala  |  Chandigarh  |  Dehradun  |   Pune   |
         | ------ | -------- | --------- | -------- | ------------ | ---------- | -------- |
         | 2014   |    0     |   0.02    |   1.87   |     1.87     |    1.87    |     0    |
         | 2015   |    0     |      0    |   0.02   |     0.02     |    0.02    |     0    |
         | 2016   |  **0**   | **0.34**  |**10.57** |  **10.57**   |  **8.48**  |   **0**  |
         | 2017   |    0     |      0    |   0.38   |     0.38     |    0.38    |     0    |
         | 2018   |    0     |      0    |   0.02   |     0.02     |    0.02    |     0    |

      Based on these values as samples, we can justify ignoring the 2016 images in our analysis due to relatively higher cloud cover in the landsat images for this year

**17/04/2019 - 23/04/2019**

   * Extend the analysis on Landsat7
   * Formally write every step of the pipeline
   * Check with the nightlights, whether it can act as an alternate for urbanisation index
      - Visually compare the regions for three types of images
   * Check for blob detection on other districts and try to overlay the boundaries on the rgb image of districts

      - Indices from blob detection:

         |  District  |    HHI      |  % built up  |  % built up in largest blob  |
         | ---------- | ----------- | ------------ | ---------------------------- |
         |   Jaipur   |   2113.55   |   1.88115%   |   43.1133%                   |
         |  Gurgaon   |   6018.30   |   14.2095%   |   77.5184%                   |
         |   Ambala   |   147.371   |   9.11452%   |   10.3358%                   |
         | Chandigarh |   274.711   |   22.6696%   |    8.0759%                   |
         |  Dehradun  |   515.729   |   8.45385%   |   18.8211%                   |
         |    Agra    |   1723.77   |   11.3623%   |   36.5945%                   |
         |  Allahabad |   40.5305   |   2.47382%   |   3.57297%                   |
         |   Bhopal   |   1550.68   |   2.39397%   |   38.7749%                   |

**24/04/2019 - 30/04/2019**

   * Analysis on classifiers:
      - Manually mark 1000 points in different districts and terrains, and label them based on their progress over 5 years. This will then serve as ground truth for validation of our classifier
      - Different regions of CDF plots onto the district map, to justify the changes over given time period
      - Reason out every step of the analysis:
         1. Choosing the smoothening filter (2 level currently)
         2. The threshold values for the 3 regions of the CDF plots
         3. Expand it to many districts to give the rigid reason
         4. 1-CDF plots, minimum area under the curve, and still the transition points shouldn't fall beyond a decent value. A tradeoff between the two. Cost has reduced and the transition points are also there
      - For reasoning the skipping of 2016 images, rigid argument should be given. For different regions, it might be different, so check the cloud scores over 5 years for different districts, and fix a rule to remove the outlier years. More than 1 outlier means dropping the district altogether

   * Nightlights:
      - Due to different resolution scales, it is highly smoothened. Due to this, we cannot use nightlights as an alternative to the classifiers outputs, since the delta is in a way lost due to different resolution scales
      - The nightlight intensity does change, which can denote more development, but not the expansion of urban areas

   * Landsat 7:
      - Discuss with Ayush about the errors in landsat images
      - Consolidate the scripts to obtain the rgb images of landsat7 and look for ways to fix the errors

   * Blob Detection:
      - Do this blob detection for images obtained from the previous analysis. Once on the constant points, which were built up already, in the first year itself. And second on the final, to consider the delta. For each of these two, we get 3 parameters, which can be used later

**01/05/2019 - 21/05/2019**

   * Related work section:
      NDBI and NDVi used as direct replacement

   * Motivation:
      - Goldblatt's data not used directly
      - We can cross check these points with the ones marked in Goldblatt's data and justify the need of post processing

   * Marking the points:
      - Instead of binary, use a scale of 1-5 or 1-4

   * Generate validation set on Jaipur and Gurgaon

**22/05/2019 - 10/06/2019**

   * Give a head to head comparision bw direct ndvi and ndbi (coarse classfiers or modis) to machine learning approach.
   
   * Goldblatt method is not very rigorous, since they fail over time, and not for months. Hence the need of our analysis
   
   * Our analysis:

      - ROC curves: Robustness of the classifiers: True positives vs False positives
      - Choices of threshold for High precision or high recall
      - Using different parameters give this amount of overestimate 
      - If some absurd results, we need to incorporate some more rules like nightlights or ndvi

**11/06/2019 - 24/06/2019**

   * Add validation tests
   * Plots to show urbanisation indices

**25/06/2019**

   * MTP final presentation