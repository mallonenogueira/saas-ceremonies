ARG NODE_VERSION=18.20.3

####

FROM node:${NODE_VERSION}-alpine  as builder

COPY . .

RUN npm i
RUN npm run build

####

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

COPY --from=builder ./node_modules ./node_modules
COPY --from=builder /dist /dist
COPY --from=builder /package*.json .
COPY --from=builder /prisma /prisma

USER node
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
