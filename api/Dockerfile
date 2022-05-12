FROM 008356366354.dkr.ecr.eu-west-1.amazonaws.com/nodejs:4104de19254d05f05f9662057e7ee579614db2cf

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

WORKDIR /usr/lib/aft-api

COPY src/ ./src
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

EXPOSE 80

CMD [ "npm", "start" ]
