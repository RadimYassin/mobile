# Use a lightweight Node.js image
FROM node:20-slim

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --production=false

# Copy all source files
COPY . .

# Install React Native CLI globally (if not already included in node_modules)
RUN npm install -g react-native-cli

# Expose port used by Metro Bundler
EXPOSE 8081

# Default command to start the dev server
CMD ["npx", "react-native", "start"]