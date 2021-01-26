#!/bin/bash
docker build --network=host -t nongnghiep-web --build-arg NODE_ENV=develop .
docker stop nongnghiep-web
docker container rm nongnghiep-web
docker run -d -it --rm --name nongnghiep-web -p 3009:80 nongnghiep-web:latest