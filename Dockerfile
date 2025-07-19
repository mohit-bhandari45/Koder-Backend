# Use Node.js 20 base image
FROM node:20

# Set working directory
WORKDIR /app

# Install required languages & tools
RUN apt-get update && \
    apt-get install -y \
    python3 \
    gcc \
    g++ \
    openjdk-17-jdk \
    && apt-get clean

# Create /app/temp directory for code execution
RUN mkdir -p /app/temp && chmod -R 777 /app/temp

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app (if you're using a build step, like TypeScript)
RUN npm run build

# Expose the port your server runs on
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
