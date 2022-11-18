FROM node:19-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install -g npm@9.1.1
RUN npm install
COPY . .
RUN node_modules/.bin/ng build --output-path=/dist
CMD ["npm", "start"]

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /dist /usr/share/nginx/html
EXPOSE 80
