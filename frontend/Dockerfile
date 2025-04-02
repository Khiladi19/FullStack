# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Clean cache and remove package-lock.json and node_modules before installing
RUN rm -rf node_modules package-lock.json && npm cache clean --force

# Install dependencies (including devDependencies to ensure build tools are available)
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React application
RUN npm run build

# Expose the correct port (Vite Preview runs on 4173)
EXPOSE 4173

# ✅ Start the preview server and bind it to 0.0.0.0
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

