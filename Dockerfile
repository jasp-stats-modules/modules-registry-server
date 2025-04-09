# Base image
FROM ubuntu:20.04

# Set environment variables
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=v22.0.0
ENV NVM_VERSION=v0.40.1

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libssl-dev \
    && apt-get clean

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash

# Load NVM and install Node.js
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION && nvm alias default $NODE_VERSION"

# Make Node and npm available globally
RUN bash -c "source $NVM_DIR/nvm.sh && nvm use default && npm install -g npm"

# Set default shell to bash
SHELL ["/bin/bash", "-c"]

# Display Node and npm versions
RUN bash -c "source $NVM_DIR/nvm.sh && node -v && npm -v"


# Set workdir
WORKDIR /usr/src/app

# Expose application port (optional, depending on the app)
EXPOSE 8080



