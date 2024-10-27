# Usecret

> For version 1 visit [here](https://helpful-cuff-links-deer.cyclic.app/home)


# How to use
- Clone the repository
- cd into the repository
- Run `npm install`
- copy the `.env.sample` file to `.env.local` and fill in the required details
```bash
cp .env.sample .env.local
```
- Run `npm run dev` to start the server
- Visit `http://localhost:3000` to view the app


# ENV Variables
- MongoDB URI - `MONGODB_URI` this is the connection string to your MongoDB database can be gotten from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or your local MongoDB instance
- MONGODB_DB - `MONGODB_DB` this is the name of the database you want to use preferably use `usecret-dev`
- GOOGLE_CLIENT_ID - `GOOGLE_CLIENT_ID` this is the client id of your google oauth app
- GOOGLE_CLIENT_SECRET - `GOOGLE_CLIENT_SECRET` this is the client secret of your google oauth app
- NEXTAUTH_URL - `NEXTAUTH_URL` this is the url of your app in development it should be `http://localhost:3000`
- WA_PHONE_NUMBER - `WA_PHONE_NUMBER` this is the phone number you want to use to send the whatsapp message
- CLOUD_API_ACCESS_TOKEN - `CLOUD_API_ACCESS_TOKEN` this is the access token for the facebook cloud api
- CLOUD_API_VERSION - `CLOUD_API_VERSION` this is the version of the facebook cloud api , default is `v20.0`
- REDIS_REST_URL - `REDIS_REST_URL` this is the url of the redis instance you want to use
- REDIS_REST_PORT - `REDIS_REST_PORT` this is the port of the redis instance you want to use
- REDIS_REST_PASSWORD - `REDIS_REST_PASSWORD` this is the password of the redis instance you want to use
- REDIS_REST_HOST - `REDIS_REST_HOST` this is the host of the redis instance you want to use


# Setting up MongoDB
## Online (MongoDB Atlas)
- Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account
- Create a new cluster
- Create a new database
- Create a new user
- Add the user to the database
- Get the connection string and use it as the `MONGODB_URI` in the `.env.local` file

## Local
- Install MongoDB on your local machine
- Create a new database
- Create a new user
- Add the user to the database
- Get the connection string and use it as the `MONGODB_URI` in the `.env.local` file


# Setting up Google OAuth
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable the Google+ API
- Create OAuth credentials
- Get the client id and client secret and use them as the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the `.env.local` file


# Setting up Facebook Cloud API
- Visit [Facebook Developers](https://developers.facebook.com/)
- Create a new app
- Get the access token and use it as the `CLOUD_API_ACCESS_TOKEN` in the `.env.local` file


# Setting up Redis
## Online (Upstash free tier)
- Visit [Upstash](https://upstash.com/)
- Create a new redis database
> Note: if using REDIS_REST_URL no need to use REDIS_REST_HOST, REDIS_REST_PORT and REDIS_REST_PASSWORD
- Get the url and use it as the `REDIS_REST_URL` in the `.env.local` file

## Local
- Install Redis on your local machine
    - On MacOS
    ```bash
    brew install redis
    ```
    - On Ubuntu
    ```bash
    sudo apt-get install redis-server
    ```
    - On Windows (recommended to use WSL)
        > use ubuntu on WSL and follow the ubuntu steps
- Start the redis server
    - On MacOS
    ```bash
    brew services start redis
    ```
    - On Ubuntu
    ```bash
    sudo systemctl start redis
    ```
- Get the host, port and password and use them as the `REDIS_REST_HOST`, `REDIS_REST_PORT` and `REDIS_REST_PASSWORD` in the `.env.local` file
    - DEFAULT PORT: 6379
    - DEFAULT PASSWORD: null
    - DEFAULT HOST: localhost




