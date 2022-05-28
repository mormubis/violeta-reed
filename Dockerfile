FROM public.ecr.aws/lambda/nodejs:16

WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./package.json ${LAMBDA_TASK_ROOT}
RUN npm install --production

COPY ./ ${LAMBDA_TASK_ROOT}

ENV NODE_ENV=production
CMD [ "index.handler" ]
