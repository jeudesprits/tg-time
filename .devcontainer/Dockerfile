# Latest Node.js based on Debian Buster slim version 
FROM node:buster-slim

# Non-root user provided by node image
ARG USERNAME=node

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Configure apt and install packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends apt-utils dialog 2>&1 \ 
    #
    # Verify git, process tools and of course zsh
    && apt-get install -y git procps zsh \
    # Install build toolchain
    && apt-get install -y python make g++ libc++1 \
    #
    # [Optional] Sudo support for non-root user
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    #
    # Update npm
    && npm i npm@latest -g

# Switch to non-root user
USER $USERNAME

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=
