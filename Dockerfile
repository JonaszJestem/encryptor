FROM node:12-alpine as builder

WORKDIR /home/app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

COPY ./src ./src
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json

RUN yarn build

FROM node:12-alpine as app
ENV NODE_ENV production

WORKDIR /home/app

COPY --from=builder /home/app/package.json /home/app/yarn.lock ./

RUN yarn --production --frozen-lockfile && yarn cache clean

COPY --from=builder /home/app/dist/ ./dist/
COPY --from=builder /home/app/src/ ./src/

CMD ["node", "dist/main.js"]
