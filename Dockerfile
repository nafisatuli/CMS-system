FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/app

COPY ./app /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app
#edited for autotrigger
# will execute npm install in /home/app because of WORKDIR
RUN npm install

# EXPOSE  4500

# Run the application
CMD ["node", "app.js"]
