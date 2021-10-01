FROM node:14-alpine

# Create web-app directory
RUN mkdir -p /usr/src/web-app
WORKDIR /usr/src/web-app

# Copy app source
COPY . /usr/src/web-app

# Install dependencies
RUN npm install
EXPOSE 80
EXPOSE 443

# Start Web-app
ENTRYPOINT export REACT_APP_JWT_PUBLIC_KEY=$(cat $REACT_APP_JWT_PUBLIC_KEY) \
 && npm run build \
 && node server.js