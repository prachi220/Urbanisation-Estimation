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

dataset = misc.imread(blob_dir + '/' + district + '.png')
# print (np.unique(dataset))

dataset1 = misc.imread(district_dir + '/' + district + '_summer_classified.png')
# print (np.unique(dataset1))

dims = dataset.shape
for i in range(dims[0]):
	for j in range(dims[1]):
		if (dataset[i][j] > 0 and dataset1[i][j] <= 2):
			dataset[i][j] = 3 #Unreliable
# print (np.unique(dataset))

imsave(blob_dir + '/' + district + '_final.png', dataset)

for i in range(dims[0]):
	for j in range(dims[1]):
		if (dataset[i][j] == 1 and dataset1[i][j] == 100):
			dataset[i][j] = 2 #changing points to bu

imsave(blob_dir + '/' + district + '_cons.png', dataset)