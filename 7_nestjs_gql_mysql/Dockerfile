# 운영체제 및 프로그램 설치 (직접 설치)
# FROM ubuntu:22.04
# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 설치 (node 18 버전과 npm, yarn이 모두 설치되어 있는 리눅스)
FROM node:18

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir ryong (아래에서 COPY 할 때, 자동으로 만들어주므로 필요 없음)
COPY ./package.json /ryong/
COPY ./yarn.lock /ryong/
WORKDIR /ryong/
RUN yarn install

COPY . /ryong/

# 3. 도커 안에서 프로젝트 실행시키기
CMD yarn start:dev