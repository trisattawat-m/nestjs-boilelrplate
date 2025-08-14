# Stage 1: Build stage with Node installed
FROM alpine:3.21 AS builder

ENV NODE_VERSION=24.5.0
WORKDIR /usr/src/app

# Install dependencies for Node.js build
RUN apk add --no-cache curl tar xz \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
    && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    && rm "node-v$NODE_VERSION-linux-x64.tar.xz"

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev for build)
RUN npm ci

# Copy app source code
COPY . .

# Build the NestJS app
RUN npm run build


# Stage 2: Production image
FROM alpine:3.21

ENV NODE_VERSION=24.5.0 \
    NODE_ENV=production
WORKDIR /usr/src/app

# Install Node.js in production image
RUN apk add --no-cache curl tar xz \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
    && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    && rm "node-v$NODE_VERSION-linux-x64.tar.xz"

# Copy built app and production dependencies
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expose NestJS default port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
