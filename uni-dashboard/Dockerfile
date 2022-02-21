FROM node:12.16.0 as build
WORKDIR /usr/local/app
COPY package.json package.json
COPY package-lock.json pacage-lock.json
RUN npm install --silent
COPY . .
RUN npm run build --prod

FROM httpd:2.4
COPY --from=build /usr/local/app/dist/uni-dashboard /usr/local/apache2/htdocs
