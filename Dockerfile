# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV development

# Installing some basic tools
RUN apt-get update && apt-get install --no-install-recommends -y \
    wget \
    vim \
    ssh \
    git \
    unzip \
    tmux

# Setting up the work directory
WORKDIR /buson

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
