FROM node:latest AS build
WORKDIR /usr/src/app
COPY index.js /usr/src/app/index.js
COPY package*.json /usr/src/app/
RUN npm ci --only=production
 
FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
CMD ["dumb-init", "node", "index.js"]