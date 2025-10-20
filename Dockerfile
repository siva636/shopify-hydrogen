# ----------------------------------------------------------------------
# 1. Development Dependencies Stage (For Build Environment)
#    Installs ALL packages (dev + prod)
# ----------------------------------------------------------------------
FROM node:22-slim AS development-dependencies-env
COPY . /app/
WORKDIR /app
# Set a generous network timeout (300,000ms = 5 minutes)
RUN npm config set fetch-retry-mintimeout 300000 \
  && npm config set fetch-retry-maxtimeout 300000 \
  && npm i

# ----------------------------------------------------------------------
# 2. Production Dependencies Stage (For Runtime Environment)
# ----------------------------------------------------------------------
FROM node:22-slim AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
# Setting npm config for stability, and running full install for production
RUN npm config set fetch-retry-mintimeout 300000 \
  && npm config set fetch-retry-maxtimeout 300000 \
  && npm i

# ----------------------------------------------------------------------
# 3. Build Stage (Runs the Build Command)
# ----------------------------------------------------------------------
FROM node:22-slim AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

# ----------------------------------------------------------------------
# 4. Final Production Environment Stage
# ----------------------------------------------------------------------
FROM node:22-slim AS production-env
# Use non-root user for security
USER node
# Copy necessary runtime files: server.mjs, package definitions
COPY ./package.json ./package-lock.json ./server.mjs /app/
# Copy the built assets and production node_modules
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build

WORKDIR /app

# Expose the default port for Shopify Hydrogen (usually 8080)
EXPOSE 8080

# The command to start the application
CMD ["npm", "run", "start"]