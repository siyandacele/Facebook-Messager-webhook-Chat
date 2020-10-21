FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/messenger-client
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 4201
CMD npm start
