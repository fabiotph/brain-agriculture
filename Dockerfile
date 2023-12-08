FROM node:20.10.0-alpine
WORKDIR /server

ADD package*.json /server/

RUN npm install

EXPOSE 3000

ADD . /server/