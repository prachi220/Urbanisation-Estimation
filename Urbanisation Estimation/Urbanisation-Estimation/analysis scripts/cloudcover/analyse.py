import json
import numpy as np
import matplotlib.pyplot as plt

states = ['Assam', 'Bihar', 'Chhattisgarh', 'Jharkhand', 'Odisha', 'Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand']

districts = {}
modified = {}
for s in states:
	d = {}
	d1 = {}
	with open(s) as json_file:  
		data = json.load(json_file)
		for p in data:
			d[str(p[0])] = p[1:]
			d1[str(p[0])] = []
	districts[s] = d
	modified[s] = d1

kept = [0]*len(states)
total = [0]*len(states)

# Absolute cloud cover values before cleanup
x = ['2014', '2015', '2016', '2017', '2018']
for idx, s in enumerate(states):
	print s
	for d in districts[s]:
		values = districts[s][d]
		plt.plot(x, values)
	print ""
	plt.title('Absolute Cloud Cover Values before thresholding : '+s)
	plt.xlabel('Years')
	plt.ylabel('Absolute Cloud Cover Values')
	plt.savefig(s+'_abs_before.png')
	plt.show()


for idx, s in enumerate(states):
	print s
	
	for d in districts[s]:
		values = districts[s][d]
		avg = np.mean(values)
		if (avg < 3):
			plt.plot(x, districts[s][d])
	print ""
	plt.title('Absolute Cloud Cover Values after thresholding : '+s)
	plt.xlabel('Years')
	plt.ylabel('Absolute Cloud Cover Values')
	plt.savefig(s+'_abs_after.png')
	plt.show()

	for d in districts[s]:
		total[idx] += 1
		values = districts[s][d]
		avg = np.mean(values)
		if (avg < 3):
			kept[idx] += 1
			for i in xrange(len(values)):
				v = values[i]
				del values[i]
				vnew = round(np.var(values),5)
				modified[s][d].append(vnew)
				values.insert(i,v)
			print d,":",np.mean(values)
			plt.plot(x, modified[s][d])
	print ""
	plt.title('Variance Plots after thresholding : '+s)
	plt.xlabel('Years')
	plt.ylabel('Variance')
	plt.savefig(s+'_var_after.png')
	plt.show()

for i, s in enumerate(states):
	print s, kept[i], total[i]