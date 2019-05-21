# Stage 1 - the build process
FROM node:lts-alpine as build
COPY . .
RUN yarn && yarn build
RUN node scripts/docker.js

# Stage 2 - the serve process
FROM node:lts-alpine
ENV PORT 8080
ENV NODE_ENV production
COPY --from=build build build
COPY --from=build package.json .
COPY --from=build .npmrc .
RUN yarn install --pure-lockfile --prod
CMD node build/server
EXPOSE ${PORT}
