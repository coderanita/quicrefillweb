# ===========================
# 1️⃣ Build stage: Node 22.18.0
# ===========================
FROM node:22.18.0 AS build

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Vite production app
RUN npm run build

# ===========================
# 2️⃣ Production stage: Nginx
# ===========================
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
