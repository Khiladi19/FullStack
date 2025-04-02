# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./

RUN npm install

# Copy all files into the container
COPY . .

# Expose the application port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run","start"]


