FROM node:boron

RUN mkdir -p /usr/src/woodmoney-api
WORKDIR /usr/src/woodmoney-api

COPY pacakge.json /usr/src/woodmoney-api
RUN npm install

COPY . /usr/src/woodmoney-api

EXPOSE 3000

CMD [ "npm", "start" ]
