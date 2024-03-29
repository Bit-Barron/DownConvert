FROM node:16-alpine AS base

RUN apk update; apk add curl bash
RUN curl -fsSL -o /bin/pnpm "https://github.com/pnpm/pnpm/releases/download/v8.5.0/pnpm-linuxstatic-x64"; chmod +x /bin/pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN pnpm i
RUN pnpm i -D @types/fastify

FROM base AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
# RUN pnpm prune --prod
# RUN curl -sfL https://raw.githubusercontent.com/tuananh/node-prune/develop/prune.sh | bash -s -- -b /usr/local/bin

FROM base
WORKDIR /app
COPY --from=build /app/dist dist/
COPY --from=build /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV CORS_ORIGIN=http://localhost:3000
ENV NODE_ENV=production
CMD [ "node", "dist/main.js" ]
