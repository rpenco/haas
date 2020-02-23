FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY bundle.js ./

RUN npm install --only=production

EXPOSE 8080

CMD [ "node", "bundle.js"]