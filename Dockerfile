FROM node:lts AS build
WORKDIR /app
COPY package*.json .

RUN npm i
COPY . .

EXPOSE 4321

CMD ["npm", "start"]
