FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the requested backend port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:prod"]