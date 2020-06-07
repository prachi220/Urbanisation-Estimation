#include <cmath>
#include <queue>
#include <string>
#include <fstream>
#include <iostream>
#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"

using namespace std;
using namespace cv;

typedef struct pt_{
	int x,y;
}pt;

typedef struct blob_{
	int min_x,max_x;
	int min_y,max_y;
	int cen_x,cen_y;
	int n_pixels;
	int ID;
	pt start;
}blob;

void getBlobs(Mat img, vector<blob>& blobs, string &outputfnamelargest, string &outputfnameall, string &csvfile){

	Mat dst = img.clone();
	Mat dst1 = img.clone();
	vector<blob> tempBlobs;
	int i,j,k,l,r = img.rows, c = img.cols, id = 1;
	cout << "Dimensions : " << r << " " << c << endl;
	vector<vector<int>> pixelId(r, vector<int>(c,-1)); //Stores ID of a pixel; -1 means unvisited
	queue<pt> open_list; //Breadth-First-Search hence queue of points
	int totalPixels = 0;
	int buPixels = 0;

	for (i = 1; i < r-1; i++){
		for (j = 1; j < c-1; j++){
			if (img.at<uchar>(i,j) == 1 || img.at<uchar>(i,j) == 2)
				totalPixels ++;
			if (img.at<uchar>(i,j) == 1)
				buPixels ++;
			if (img.at<uchar>(i,j) != 1 || pixelId[i][j] > -1)
				continue;
			pt start = {j,i};
			open_list.push(start);
			int sum_x = 0, sum_y = 0, n_pixels = 0, max_x = 0, max_y = 0;
			int min_x = c+1, min_y = r+1;
			while (!open_list.empty()){
				//Dequeue the element at the head of the queue
				pt top = open_list.front();
				open_list.pop();
				pixelId[top.y][top.x] = id;
				n_pixels++;

				//To obtain the bounding box of the blob w.r.t the original image
				min_x = (top.x < min_x)?top.x:min_x;
				min_y = (top.y < min_y)?top.y:min_y;
				max_x = (top.x > max_x)?top.x:max_x;
				max_y = (top.y > max_y)?top.y:max_y;
				sum_y += top.y;
				sum_x += top.x;

				//Add the 8-connected neighbours that are yet to be visited, to the queue
				for (k = top.y-1; k <= top.y+1; k++){
					for (l = top.x-1; l <= top.x+1; l++){
						if (img.at<uchar>(k,l) != 1 || pixelId[k][l] > -1)
							continue;
						pt next = {l,k};
						pixelId[k][l] = id;
						open_list.push(next);
					}
				}
			}

			blob nextcentre = {min_x, max_x, min_y, max_y, sum_x/n_pixels, sum_y/n_pixels, n_pixels, id, start};
			tempBlobs.push_back(nextcentre);
			id++;
		}
	}

	std::sort(tempBlobs.begin(), tempBlobs.end(), [](const blob_ &b1, const blob_ &b2) {
		return b1.n_pixels > b2.n_pixels;
	});
	blob b = tempBlobs[0];
	int maxPixels = b.n_pixels;
	float hhi = 0.0;

	// cout << "Number of blobs : " << tempBlobs.size() << endl;
	// cout << "Largest blob : " << maxPixels << endl;
	// cout << "Total BU pixels : " << buPixels << endl;
	// cout << "Total pixels : " << totalPixels << endl;
	// cout << "% BU in total : " << (float)buPixels/(float)totalPixels * 100 << "%" << endl;
	// cout << "% BU from largest blob in total : " << (float)maxPixels/(float)totalPixels * 100 << "%" << endl;
	
	int npixels, cumSum = 0, cutoff = buPixels * 0.9, numBlobs = 0;
	for (auto &b: tempBlobs){
		npixels = b.n_pixels;
		if (cumSum + npixels > cutoff){
			break;
		}
		cumSum += npixels;
		numBlobs += 1;
		hhi += pow(npixels, 2);
	}
	hhi *= pow(100.0/float(cumSum), 2);

	std::ofstream outfile;
	outfile.open(csvfile.c_str(), std::ofstream::app);
	cout << "Number of blobs : " << numBlobs << endl;
	cout << "Largest blob : " << maxPixels << endl;
	cout << "Total BU pixels : " << cumSum << endl;
	cout << "% BU in total : " << (float)cumSum/(float)totalPixels * 100 << "%" << endl;
	outfile << numBlobs << " ";
	cout << "% BU from largest blob in total BU : " << (float)maxPixels/(float)cumSum * 100 << "%" << endl;
	outfile << (float)maxPixels/(float)cumSum * 100 << " ";
	cout << "HHI Index : " << hhi << endl;
	outfile << hhi << " ";
	outfile.close();

	int cumSum1 = 0, iter = 1;
	for (auto &b: tempBlobs){
		npixels = b.n_pixels;
		if (cumSum1 + npixels > cutoff){
			break;
		}
		cumSum1 += npixels;
		open_list.push(b.start);
		int n_pixels = 0;
		while (!open_list.empty()){
			//Dequeue the element at the head of the queue
			pt top = open_list.front();
			open_list.pop();
			dst.at<uchar>(top.y,top.x) = 200;
			n_pixels++;

			//Add the 8-connected neighbours that are yet to be visited, to the queue
			for (k = top.y-1; k <= top.y+1; k++){
				for (l = top.x-1; l <= top.x+1; l++){
					if (dst.at<uchar>(k,l) != 1)
						continue;
					pt next = {l,k};
					dst.at<uchar>(next.y,next.x) = 200;
					open_list.push(next);
				}
			}
		}
		if (iter){
			imwrite(outputfnamelargest,dst);
			iter = 0;		
		}
	}
	imwrite(outputfnameall,dst);

	// for (int l = b.min_y; l <= b.max_y; l++){
	// 	dst1.at<uchar>(l,b.min_x) = 200;
	// 	dst1.at<uchar>(l,b.max_x) = 200;
	// }
	// for (int l = b.min_x; l <= b.max_x; l++){
	// 	dst1.at<uchar>(b.min_y,l) = 200;
	// 	dst1.at<uchar>(b.max_y,l) = 200;
	// }
	// imwrite("result_gurgaon_final.jpg",dst1);

}

int main(int argc, char **argv){

	string inputfname = argv[1];
	string outputfnamelargest = argv[2];
	string outputfnameall = argv[3];
	string csvfile = argv[4];
	Mat image = imread(inputfname,0);

	vector<blob> blobs;
	getBlobs(image, blobs, outputfnamelargest, outputfnameall, csvfile);
	return 0;
}