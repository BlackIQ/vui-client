# Use the Node base image as the build stage
FROM node:alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Pipfile and Pipfile.lock to the container
COPY package.json .

# Install dependencies
RUN npm i

# Copy the application code to the container
COPY . .

# Set the environment variables
ENV NEXT_PUBLIC_API_URL=http://localhost:8000/api
ENV NEXT_PUBLIC_API_KEY=hello-amir-hi-hossein

# Building app
RUN npm run build

# Expose the container port
EXPOSE 3000

# Start the Flask application
CMD ["npm", "run", "dev"]