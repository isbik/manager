# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

COPY ./package*.json ./

# Install PM2 globally
RUN npm install --global pm2
# Install dependencies
RUN npm install 
# Copy all files
COPY ./ ./

RUN npm run build


# Expose the listening port
EXPOSE 3000

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]