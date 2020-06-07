import sys
import copy
import numpy as np
import pandas as pd
from PIL import Image
from scipy import misc
from scipy import ndimage
from scipy.misc import imsave

district = sys.argv[1]
district_dir = sys.argv[2]
blob_dir = sys.argv[3]

dataset = misc.imread(district_dir + '/' + district + '_summer_2018.tif')
data = dataset % 2

# Median Filter
# smooth = ndimage.median_filter(dataset, 3)
# print (np.unique(smooth))

# Convolution with gaussian filter
# k = np.array([[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]])
k = np.array([[1,1,1],[1,1,1],[1,1,1]])
smooth = ndimage.convolve(data, k, mode='constant', cval=0.0)
smooth = ndimage.gaussian_filter(smooth, sigma=0.2)
smooth = np.sign(smooth)
dims = smooth.shape
for i in range(dims[0]):
	for j in range(dims[1]):
		if (smooth[i][j] == 0 and dataset[i][j] > 1):
			smooth[i][j] = 2

imsave(blob_dir + '/' + district + '.png', smooth)