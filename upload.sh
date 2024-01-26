#!/bin/bash

BUCKET="pigpit.family"

aws s3 cp ./ s3://pigpit.family --profile roryj-home
