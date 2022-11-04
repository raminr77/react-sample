# Pull Official Base Image
FROM node:latest

# Set Working Directory
WORKDIR /app

# Install App Dependencies
COPY ["package.json", "yarn.lock", "/app/"]
RUN yarn

# Add App
COPY [".", "/app"]

# Start App
CMD ["npm", "build"]
