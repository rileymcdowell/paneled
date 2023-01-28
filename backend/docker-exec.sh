#!/bin/bash

NAME=$(docker ps --format '{{ .Names }}' | grep paneldashboard-backend-web)

if [ $? -ne 0 ] ; then
    echo "Running container not found"
else
    docker exec -it $NAME /bin/bash
fi
