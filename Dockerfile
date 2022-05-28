FROM public.ecr.aws/lambda/nodejs:14
COPY helloWorldFunction.js package*.json ./
RUN npm install
CMD [ "helloWorldFunction.handler" ]
