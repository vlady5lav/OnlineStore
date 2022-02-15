FROM node:lts-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn set version stable
RUN yarn install
COPY . .
EXPOSE 5001
CMD [ "yarn", "start" ]
