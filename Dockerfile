# Use the official Node.js Alpine image for a small footprint
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package management files first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of your application source code
COPY . .

# Expose the port your Node.js app runs on (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
