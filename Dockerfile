FROM node:lts AS build
WORKDIR /app
COPY . .

RUN npm i
CMD ["npm", "start"]

EXPOSE 4321
