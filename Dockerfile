# Use the official Node.js 20 LTS image as the base
# The node:20-slim Docker image is based on Debian 12 (codenamed "Bookworm").
# The Debian 12 distribution ships with GNU C Library (glibc) version 2.36.
# Use the official Node.js 20 LTS image as the base
FROM node:20-slim

# Set a working directory for your project
WORKDIR /usr/src/app

# As we are still the root user, apt-get commands will succeed
RUN apt-get update && \
  apt-get install -y \
  git \
  curl \
  ca-certificates \
  iputils-ping \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Update dependencies to ensure compatibility
# RUN npm update -g
# Install the specific npm version globally
RUN npm install -g npm@11.5

# Install the Shopify CLI globally
RUN npm install -g @shopify/cli @shopify/app

# Now, we switch to a non-root user for security
USER node

# Expose the default port for local development servers (e.g., for Remix)
EXPOSE 3000

# The command to run when the container starts
CMD ["/bin/bash"]