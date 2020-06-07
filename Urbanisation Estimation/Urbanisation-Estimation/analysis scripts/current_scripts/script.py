import copy
import numpy as np
import pandas as pd
from pylab import *
from PIL import Image
from scipy import misc
from scipy import ndimage
from scipy.misc import imsave
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

district = 'Jaipur_summer'
year = [14, 15, 16, 17, 18]

# Perform Smoothing

matSmooth = []
matOriginal = []
for i in range(len(year)):
	print(i)
	dataset = misc.imread('images/' + district + '_20' + str(year[i]) + '.tif')
	data = dataset % 2
	
	# Gaussian Filter
	# smooth = ndimage.gaussian_filter(data, sigma=0.2) # [0, 1]
	
	# Median Filter
	# smooth = ndimage.median_filter(data, 3) # [0, 1]
	
	# Convolution
	k = np.array([[1,1,1],[1,1,1],[1,1,1]])
	smooth = ndimage.convolve(data, k, mode='constant', cval=0.0) # [0,1,2,3,4,5,6,7,8,9]
	
	# Convolution with gaussian filter
	# k = np.array([[1,1,1],[1,1,1],[1,1,1]])
	# smooth = ndimage.convolve(data, k, mode='constant', cval=0.0)
	# smooth = ndimage.gaussian_filter(smooth, sigma=0.2) # [0,1,2,3,4,5,6,7,8,9]
	
	# print (np.unique(smooth)) 

	original = dataset.flatten()
	smoothed = smooth.flatten()
	assert(len(original) == len(smoothed))
	smooth_temp = [smoothed[i] for i in xrange(len(smoothed)) if original[i] > 0]
	original_temp = [2-i for i in original if i > 0]
	assert(len(smooth_temp) == len(original_temp))

	matOriginal.append(original_temp)
	matSmooth.append(smooth_temp)

matOriginal = np.array(matOriginal, copy=False).T
matSmooth = np.array(matSmooth, copy=False).T
print (matOriginal.shape)
print (matSmooth.shape)

# Perform Linear Regression (exclude boundary points as well)

x1 = np.reshape(range(len(year)), (-1,1))

i = 0
dataset = misc.imread('images/' + district + '_2014.tif')
dims = dataset.shape

slope = []
intercept = []
cost_array = []

mask = np.sign(dataset)
k = np.array([[1,1,1],[1,1,1],[1,1,1]])
mask1 = ndimage.convolve(mask, k, mode='constant', cval=0.0)

for j in range(dims[0]):
	for k in range(dims[1]):
		if (mask[j][k]):
			if (mask1[j][k] == 9):
				lm = LinearRegression()
				reg = lm.fit(x1, matSmooth[i])
				cost = np.mean((matSmooth[i] - lm.predict(x1))**2)
				cost_array.append(cost)
				slope.append(round(reg.coef_[0], 4))
				intercept.append(round(reg.intercept_, 4))
			i += 1

cost_array = np.array(cost_array)
print (cost_array.shape)

# Save the cost array
np.savetxt(district + '_cost_array.txt', cost_array, fmt='%d')

# Plot the histogram
n, bins, patches = plt.hist(x=cost_array, bins='auto', color='#0504aa',
                            alpha=0.7, rwidth=0.85)
plt.grid(axis='y', alpha=0.75)
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title(district + ' Histogram')
maxfreq = n.max()
# Set a clean upper y-axis limit.
plt.ylim(ymax=np.ceil(maxfreq / 10) * 10 if maxfreq % 10 else maxfreq + 10)
plt.savefig(district + '_histogram')
plt.clf()
plt.cla()
plt.close()

# Plot the CDF
unique_elements, counts_elements = np.unique(cost_array, return_counts=True)
total_count_elements = (float) (counts_elements.sum())
counts_elements = counts_elements/total_count_elements
# Compute the CDF
cdf = np.cumsum(counts_elements)
threshold = unique_elements[np.where(cdf == min(cdf, key=lambda x:abs(x-0.5)))]
plot(unique_elements, cdf, 'b', label=district)
legend(loc='lower right')
savefig(district + '_cdf')


# Count the favourable points and show them on the map

countFavourable = 0
countUnfavourable = 0

i = 0
for j in range(dims[0]):
	for k in range(dims[1]):
		if (mask1[j][k] == 9):
			if (slope[i] >= 0 and cost_array[i] <= threshold):	# favourable
				dataset[j][k] = 200
				countFavourable += 1
			else:
				dataset[j][k] = 50
				countUnfavourable += 1
			i += 1

countTotal = (float) (countFavourable + countUnfavourable)

imsave(district + '_favourable.png', dataset)
print 'Unfavourable :', countUnfavourable
print 'Favourable :', countFavourable
print 'Total :', countTotal
print 'Unfavourable % :', (100 * countUnfavourable/countTotal)