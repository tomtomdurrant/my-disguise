# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm

# Copy package.json and pnpm-lock.yaml (if you have one)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Nuxt app
RUN npm run build

# Expose the port Nuxt runs on
EXPOSE 8000

# Start the Nuxt app
CMD ["npm", "run", "preview"]