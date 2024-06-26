#!/bin/bash

BUCKET="pigpit.family"

# For some reason the html files are picked up properly by the aws s3 regex here :shrug:
# so instead we use find to get all the html files
echo "uploading html files to $BUCKET"
find -name "*.html" | xargs -I {} aws s3 cp {} "s3://$BUCKET"

echo "uploading js files to $BUCKET"
aws s3 cp ./*.js "s3://$BUCKET"

echo "uploading json files to $BUCKET"
aws s3 cp ./*.json "s3://$BUCKET"

echo "uploading image files to $BUCKET"
aws s3 cp ./*.png "s3://$BUCKET"

echo "DONE"
