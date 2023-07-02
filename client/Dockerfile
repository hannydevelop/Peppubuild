# Use the official Node.js image as the base image
FROM node:14-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the Vue.js application using webpack
RUN npm run build

# Expose the container's port (optional, modify as per your application needs)
EXPOSE 8080

# Specify the command to run when the container starts
CMD [ "http-server", "dist" ]
