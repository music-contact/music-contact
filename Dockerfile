FROM node:18.14.2-alpine3.17

COPY . /opt/music-contact
WORKDIR /opt/music-contact
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]

