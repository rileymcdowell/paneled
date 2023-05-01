#!/bin/bash

NAME=$(docker ps --format '{{ .Names }}' | grep server)

if [ $? -ne 0 ] ; then
    echo "Running container not found"
else
    docker exec -it $NAME /bin/bash
fi
