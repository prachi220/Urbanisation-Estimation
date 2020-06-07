#!/bin/bash

DISTRICTS=districtlist
DISTRICTS_DIR=districts
CSV_FILE=params
rm "$CSV_FILE"
echo "District %Num_blobs_cons %BU_in_largest_blob_cons hhi_cons %Num_blobs_final %BU_in_largest_blob_final hhi_final" >> "$CSV_FILE"
while read LINE; do
	echo "$LINE"
     ./blobDistrict.sh "$LINE" "$DISTRICTS_DIR" "$CSV_FILE"
done < $DISTRICTS