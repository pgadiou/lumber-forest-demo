FROM node:10-alpine
RUN apk add --no-cache \
      git
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
