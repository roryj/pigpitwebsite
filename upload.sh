#!/bin/bash

BUCKET="pigpit.family"

# For some reason the html files are picked up properly by the aws s3 regex here :shrug:
# so instead we use find to get all the html files
echo "uploading html files to $BUCKET"
find . -name "*.html" -type f -exec aws s3 cp {} "s3://$BUCKET" \;

echo "uploading js files to $BUCKET"
find . -name "*.js" -type f -exec aws s3 cp {} "s3://$BUCKET" \;

echo "uploading json files to $BUCKET"
find . -name "*.json" -type f -exec aws s3 cp {} "s3://$BUCKET" \;

echo "uploading image files to $BUCKET"
find . -name "*.png" -type f -exec aws s3 cp {} "s3://$BUCKET" \;
find . -name "*.jpg" -type f -exec aws s3 cp {} "s3://$BUCKET" \;
find . -name "*.svg" -type f -exec aws s3 cp {} "s3://$BUCKET" \;

echo "DONE"
