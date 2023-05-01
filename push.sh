#!/bin/bash

source ./config.sh

DATE_TAG=${Y}.${M}.${D}
docker tag ${SERVER_IMG_NAME}:latest ${SERVER_IMG_NAME}:${DATE_TAG}

docker push ${SERVER_IMG_NAME}:latest
docker push ${SERVER_IMG_NAME}:${DATE_TAG}