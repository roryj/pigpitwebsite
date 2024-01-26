#!/bin/bash

BUCKET="pigpit.family"

echo "uploading html files to $BUCKET"
aws s3 cp ./*.html "s3://$BUCKET" --profile roryj-home

echo "uploading image files to $BUCKET"
aws s3 cp ./*.png "s3://$BUCKET" --profile roryj-home

echo "DONE"
