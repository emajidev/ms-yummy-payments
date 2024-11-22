FROM node:latest as build
WORKDIR /usr/src/app
COPY package.json .
ADD . /usr/src/app
RUN npm install --quiet --legacy-peer-deps
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf
RUN npm run build

#final container
FROM  node:latest
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .

CMD ["node", "dist/src/main"]
EXPOSE 3000