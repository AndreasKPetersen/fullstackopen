FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .
ENV REACT_APP_BACKEND_URL=/api

RUN npm ci

RUN npm run build

# Test stage for running tests
FROM build-stage AS test-stage
RUN CI=true npm test

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
