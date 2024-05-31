# ######################################
#    BUILD FOR LOCAL DEVELOPMENT     #
######################################
FROM node:22.0.0-alpine3.19

# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

# Copy and install the dependencies for the project
COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm install

# Bundle app source
COPY --chown=node:node . .
# Start the server using the development build
CMD npx prisma migrate deploy && npm run dev

