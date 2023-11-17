FROM node:18
WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN yarn build
CMD ["yarn","start"]