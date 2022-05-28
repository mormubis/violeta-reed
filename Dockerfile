FROM public.ecr.aws/lambda/nodejs:16

WORKDIR /usr/server/app

COPY ./package.json ./
RUN npm install --production

COPY ./ .

ENV NODE_ENV=production
CMD ["npm", "run" ,"start"]
