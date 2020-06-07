CC = g++
CXXFLAGS = -std=c++11 -O3
PFLAGS = `pkg-config --cflags --libs opencv`

all: 
	$(CC) blob.cpp $(CXXFLAGS) $(PFLAGS) -o blob 

clean:
	rm -f blob