import sys
import copy
import numpy as np
import pandas as pd
from PIL import Image
from scipy import misc
from scipy import ndimage
from scipy.misc import imsave

district = sys.argv[1]
dataset = misc.imread(district + '.tif')
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

imsave(district + '.png', smooth)