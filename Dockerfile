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
WORKDIR /home/app

COPY --from=builder /home/app/package.json /home/app/yarn.lock ./

# RUN yarn --production --frozen-lockfile && yarn cache clean
# No separate dockerfile for production so installing all dependencies:
RUN yarn --frozen-lockfile

COPY --from=builder /home/app/dist/ ./dist/
COPY --from=builder /home/app/src/ ./src/
COPY ./seeds/ ./seeds/
COPY ./test/ ./test/
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json

CMD ["node", "dist/main.js"]
