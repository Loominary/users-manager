RUN THE APP:

    SET DEBUG=users-manager:_ & npm start 
    |OR| 
    SET DEBUG='users-manager:_'; npm start

_____________________________________________

 Database tables and fields:

    Database name: set up in config file!
    users: user_id, full_name, email, status

 ____________________________________________

Empty config/dev template:

    module.exports = {
        DB_HOST: '',
        DB_USER: '',
        DB_PASSWORD: '',
        DB_DATABASE: '',

        //AUTH
        JWT_SECRET: '',

    }