FROM arm64v8/node

COPY ./package.json .
RUN npm install --production

COPY ./ .

ENV NODE_ENV=production
CMD ["npm", "start"]
