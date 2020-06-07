import copy
import libtiff
import numpy as np
import pandas as pd
from PIL import Image
from libtiff import TIFF
from scipy.misc import imsave
import matplotlib.pyplot as plt
libtiff.libtiff_ctypes.suppress_warnings()
from sklearn.linear_model import LinearRegression

year = [14, 15, 16, 17, 18]

dx = [-1, -1, -1, 0, 0, 1, 1, 1]
dy = [-1, 0, 1, -1, 1, -1, 0, 1]

def count(band1, j, k):
	x = 0
	y = 0
	for i in range(8):
		nx = j+dx[i]
		ny = k+dy[i]
		if (band1[nx][ny] == 0):
			x = 0
			y = 0
			break
		elif (band1[nx][ny] == 1):
			x += 1
		else:
			y += 1
	return x, y

mat = []
for i in range(5):
	print(i)
	dataset = TIFF.open('nightlights/Gurgaon_summer_20' + str(year[i]) + '.tif', mode = 'r')
	band2 = dataset.read_image()
	band2[np.isnan(band2)] = 0
	lower, upper = 0, 2
	band1 = [[lower + (upper - lower) * x for x in l] for l in band2]
	band1 = np.array(band1)
	dims = band1.shape
	imsave('temp_gurgaon_summer_20' + str(year[i]) + '.png', band1)
	band = band1.flatten()
	flat = [i for i in band if i >= 0]
	mat.append(flat)
	
mat = np.array(mat)
mat = mat.T

x1 = np.reshape(range(5), (-1,1))

m = {}
m1 = {}

count1 = 0
count2 = 0
i = 0
dataset = TIFF.open('nightlights/Gurgaon_summer_2014.tif', mode = 'r')
band = dataset.read_image()
band[np.isnan(band)] = 0
band1 = copy.deepcopy(band)
dims = band.shape
for j in range(1, dims[0]-1):
	for k in range(1, dims[1]-1):
		if (band[j][k] > 0):
			lm = LinearRegression()
			reg = lm.fit(x1, mat[i])
			p = (round(reg.coef_[0], 4))
			if not (p in m):
				m[p] = 0
			m[p] += 1
			p1 = (round(reg.coef_[0], 4), round(reg.intercept_, 4))
			if not (p1 in m1):
				m1[p1] = 0
			m1[p1] += 1
			if (round(reg.coef_[0], 4) >= 0):	# favourable
				band1[j][k] = 100
				count1 += 1
			else:
				band1[j][k] = 50
				count2 += 1
			i += 1
			
imsave("noisy_gurgaon_summer_nightlights.png", band1)
print("Positives",count1)
print("Negatives",count2)

# for (slope) in m:
# 	print(slope, m[slope])

# for (slope, intercept) in m1:
# 	print(slope, intercept, m1[(slope, intercept)])

# # Alpha = Intercept
# # Beta = Slope

# fig, ax = plt.subplots()
# plt.title('Plot')
# plt.xlabel('beta (slope)')
# plt.ylabel('alpha (intercept)')

# # for i, txt in enumerate(n):
# #     ax.annotate(txt, (z[i], y[i]))

# ax.set_xlim([-5, 5])
# ax.set_ylim([-5, 5])

# for (slope, intercept) in m1:
# 	ax.annotate(m1[(slope, intercept)], (slope, intercept), size=5)

# # plot(x, y, 'Plot', 'beta', 'alpha','o')
# plt.show()