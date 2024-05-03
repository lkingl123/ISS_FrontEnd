# Set the base image
FROM ubuntu:22.04

# Install curl and other dependencies
RUN apt-get update && apt-get install -y curl git

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Setup the environment for nvm in the shell
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=lts/*
RUN . "$NVM_DIR/nvm.sh" && nvm install $NODE_VERSION && nvm use $NODE_VERSION && nvm alias default $NODE_VERSION

# Add node and npm to path so the commands are available
ENV PATH $NVM_DIR/versions/node/v*/bin:$PATH

# Copy app source code to Docker image
COPY app /app

# Set the working directory
WORKDIR /app

RUN node --version
RUN nodejs --version

# Install npm dependencies, including 'react-native-cli'
# RUN npm install -g react-native-cli && npm install

# Command to run when starting the container
# CMD ["npm", "start"]

