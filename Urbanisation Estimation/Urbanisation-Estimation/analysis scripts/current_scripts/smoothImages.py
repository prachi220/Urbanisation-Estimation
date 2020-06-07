import copy
import numpy as np
import pandas as pd
from PIL import Image
from scipy import misc
from libtiff import TIFF
from scipy import ndimage
from scipy.misc import imsave
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

district = 'Gurgaon_summer'

year = [14, 15, 16, 17, 18]

mat = []
mat1 = []
for i in range(len(year)):
	print(i)
	dataset = misc.imread('images/' + district + '_20' + str(year[i]) + '.tif')

	# Gaussian Filter
	smooth = ndimage.gaussian_filter(dataset, sigma=0.2)
	print (np.unique(smooth))
	smooth *= 120
	imsave('smooth_images/' + district + '_smooth_gaussian_' + str(i) + '.png', smooth)
	
	# Median Filter
	# smooth = ndimage.median_filter(dataset, 3)
	# print (np.unique(smooth))
	# smooth *= 120
	# imsave('smooth_images/' + district + '_smooth_median_' + str(i) + '.png', smooth)

	# Convolution
	# data = dataset%2
	# mask = (dataset+1)/2
	# k = np.array([[1,1,1],[1,1,1],[1,1,1]])
	# smooth = 9 - ndimage.convolve(data, k, mode='constant', cval=0.0)
	# smooth = 25 * np.multiply(smooth, mask)
	# print (np.unique(smooth))
	# imsave('smooth_images/' + district + '_smooth_conv_' + str(i) + '.png', smooth)

	# Convolution with gaussian filter
	# data = dataset%2
	# mask = (dataset+1)/2
	# k = np.array([[1,1,1],[1,1,1],[1,1,1]])
	# smooth = 9 - ndimage.convolve(data, k, mode='constant', cval=0.0)
	# smooth = np.multiply(smooth, mask)
	# smooth = 25 * ndimage.gaussian_filter(smooth, sigma=0.2)
	# print (np.unique(smooth))
	# imsave('smooth_images/' + district + '_smooth_conv_gaussian_' + str(i) + '.png', smooth)
