# Use the official Node.js 16 image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8081 to the outside world
EXPOSE 8081

# Command to run your React Native app
CMD ["npm", "start"]
