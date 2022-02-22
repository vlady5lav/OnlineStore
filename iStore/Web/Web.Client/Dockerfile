FROM node:lts-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn set version berry
RUN yarn plugin import typescript
RUN yarn plugin import interactive-tools
RUN yarn install
RUN yarn up
COPY . .
EXPOSE 5001
CMD [ "yarn", "start" ]
