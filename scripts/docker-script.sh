#!/bin/sh

DOCKER_IMAGE_NAME=my-nest-app

DOCKER_CONTAINER_NAME=nest-app

# 이미 기존 docker가 container로 올라가있는 경우 기존 컨테이너 내리기
echo "기존에 띄워진 컨테이너가 있다면 삭제합니다."
docker rm -f $(docker ps -qa)

# 이미지 삭제
echo "기존에 생성된 이미지가 있다면 삭제합니다."
docker rmi ${DOCKER_IMAGE_NAME} || notExistsImage=true

if [ $notExistsImage ]
then
    echo "기존에 생성된 이미지가 없습니다."
fi

echo "이전 프로세스에 대해 이상이 없습니다."
echo "이제 컨테이너를 띄웁니다."

# 도커 이미지 빌드
docker build -t ${DOCKER_IMAGE_NAME} . # <--- 프로젝트 루트 경로에 대한 상대경로

# 도커 컨테이너 띄우기
docker run -d -p 3001:3000 --name ${DOCKER_CONTAINER_NAME} ${DOCKER_IMAGE_NAME}