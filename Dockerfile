FROM node:18-alpine as builder
WORKDIR /hackquest

COPY pnpm-lock.yaml .
COPY package.json .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine as runner
WORKDIR /hackquest
COPY --from=builder /hackquest/package.json .
COPY --from=builder /hackquest/pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm i --prod --ignore-scripts
COPY --from=builder /hackquest/next.config.js .
COPY --from=builder /hackquest/public ./public
COPY --from=builder /hackquest/.next ./.next

CMD [ "pnpm", "start" ]
EXPOSE 3000
