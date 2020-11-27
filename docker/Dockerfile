FROM node:alpine as builder

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm
# Set the working directory
WORKDIR /app
# Copy the file from your host to your current location
COPY package.json .
# Run the command inside your image filesystem
RUN npm install
# Copy the rest of your app's source code from your host to your image filesystem.
COPY . /app
RUN npm run build



FROM nginx:latest

RUN apt-get update && apt-get upgrade -y
RUN apt install -y supervisor

# RUN ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime

# Copy id_rsa
# COPY ./files/.ssh /root/.ssh
# RUN chmod -R 600 /root/.ssh

# nginx config
COPY ./docker/files/nginx/default.conf /etc/nginx/conf.d/

# ADD ./docker/files/supervisor/ /etc/supervisor/conf.d/

# RUN mkdir -p /var/log/supervisor && mkdir -p /var/run/sshd

#EXPOSE 22 80
WORKDIR /app/pharmacy-web

RUN mkdir -p /app/pharmacy-web

COPY --from=builder ./app/build/ /app/pharmacy-web

CMD ["nginx", "-g", "daemon off;"]
