FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm SETUP
COPY . .
CMD ["npm","run start"]