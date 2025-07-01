# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy entire frontend project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
