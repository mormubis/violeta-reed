FROM node

COPY ./package.json .
RUN npm install --production

COPY ./ .

ENV NODE_ENV=production
ENTRYPOINT ["npm start"]
