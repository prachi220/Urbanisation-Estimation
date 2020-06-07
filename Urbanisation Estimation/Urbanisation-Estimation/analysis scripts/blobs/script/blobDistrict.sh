#!/bin/bash

if [ "$#" == 3 ]; then
	DISTRICT="$1"
	DISTRICTS_DIR="$2"
	CSV_FILE="$3"
	echo -n "$DISTRICT" >> "$CSV_FILE"
	echo -n " " >> "$CSV_FILE"
	DISTRICT_DIR="$DISTRICTS_DIR"/"$DISTRICT"
	BLOB_DIR="$DISTRICT_DIR"/blob
	mkdir "$BLOB_DIR"
	python smoothImage.py "$DISTRICT" "$DISTRICT_DIR" "$BLOB_DIR"
	python processAnalysisOutput.py "$DISTRICT" "$DISTRICT_DIR" "$BLOB_DIR"
	FINAL_IMAGE="$BLOB_DIR"/"$DISTRICT"_final.png
	FINAL_IMAGE_LARGEST="$BLOB_DIR"/"$DISTRICT"_largest_final.png
	FINAL_IMAGE_ALL="$BLOB_DIR"/"$DISTRICT"_all_final.png
	FINAL_IMAGE_LOGS="$BLOB_DIR"/"$DISTRICT"_logs_final
	CONS_IMAGE="$BLOB_DIR"/"$DISTRICT"_cons.png
	CONS_IMAGE_LARGEST="$BLOB_DIR"/"$DISTRICT"_largest_cons.png
	CONS_IMAGE_ALL="$BLOB_DIR"/"$DISTRICT"_all_cons.png
	CONS_IMAGE_LOGS="$BLOB_DIR"/"$DISTRICT"_logs_cons
	./blob "$CONS_IMAGE" "$CONS_IMAGE_LARGEST" "$CONS_IMAGE_ALL" "$CSV_FILE" > "$CONS_IMAGE_LOGS"
	./blob "$FINAL_IMAGE" "$FINAL_IMAGE_LARGEST" "$FINAL_IMAGE_ALL" "$CSV_FILE" > "$FINAL_IMAGE_LOGS"
	echo "" >> "$CSV_FILE"
	
else
	echo "Illegal number of parameters ($#)"
fi