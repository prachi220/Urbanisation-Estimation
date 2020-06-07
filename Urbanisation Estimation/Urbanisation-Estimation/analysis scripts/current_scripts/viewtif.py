from scipy import misc
from scipy import ndimage
from scipy.misc import imsave

district = 'Jaipur_summer'
dataset = misc.imread(district + '_2014.tif')
dataset *= 120
imsave('output.png', dataset)