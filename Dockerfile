FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001
CMD [ "node", "index.js" ]