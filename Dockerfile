# Latest Node.js based on Debian Buster slim version 
FROM node:buster-slim

# Non-root user provided by node image
ARG USERNAME=node

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Configure apt and install packages
RUN apt-get update \
    #
    # Install build toolchain
    && apt-get install -y python make g++ libc++1 \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    #
    # Update npm
    && npm i npm@latest

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=

# Install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/app && chown $USERNAME:$USERNAME /opt/app
WORKDIR /opt/app

# The official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
USER $USERNAME
COPY package.json package-lock.json* ./
RUN npm i
ENV PATH /opt/app/node_modules/.bin:$PATH

# Copy in our source code last, as it changes the most
COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
