from libtiff import TIFF
import sys
import numpy as np
from numpy import *
import os
from PIL import Image
from os import listdir
from os.path import isfile, join
import scipy.misc


# inputFolder = sys.argv[1]
# outputFolder = sys.argv[2]
# os.makedirs(outputFolder, exist_ok=True)
# onlyfiles = [f for f in listdir(inputFolder) if isfile(join(inputFolder, f))]


# for currImageName in onlyfiles:
# 	destImageName = currImageName[:-4]+'.png'
# 	# tif = TIFF.open(inputFolder+'/'+currImageName, mode='r')
# 	# image = tif.read_image()
# 	# data = np.array(image)
# 	# scipy.misc.imsave(outputFolder+'/'+destImageName, data[:,:,0:3])
# 	print (destImageName)

district = 'gurgaon'
currImageName = district + '.tif'
destImageName = district + '.png'
tif = TIFF.open(currImageName, mode='r')
image = tif.read_image()
data = np.array(image)
where_are_NaNs = isnan(data)
data[where_are_NaNs] = 0
scipy.misc.imsave(destImageName, data[:,:,0:3])