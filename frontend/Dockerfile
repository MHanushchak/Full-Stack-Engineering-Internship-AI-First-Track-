FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the requested frontend port
EXPOSE 3000

# Start the development server
# NOTE: Change "npm run dev" to "npm start" if you used Create React App instead of Vite.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]