FROM 008356366354.dkr.ecr.eu-west-1.amazonaws.com/nodejs:9cabc90420ba3fa2e806c79d9c8810d96ce0ce07

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

WORKDIR /usr/lib/aft-api

COPY src/ ./src
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

EXPOSE 80

CMD [ "npm", "start" ]
