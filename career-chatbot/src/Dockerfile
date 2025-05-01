# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build React app
RUN npm run build

# Expose port (if you're using development server)
EXPOSE 3000

# Command for dev server (optional) or static file hosting
CMD ["npm", "start"]
