FROM public.ecr.aws/lambda/nodejs:16

WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./package.json .
RUN npm install --production

COPY ./ .

ENV NODE_ENV=production
CMD [ "index.handler" ]
