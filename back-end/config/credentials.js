module.exports = {
    host: "localhost",
    secret: "ByteTheBit  2020",
    database: {
        db_name:  "energy",
        test_db_name: "energyTest",
        username: "user",
        password: "user",
        cluster : "cluster0-0pwss.mongodb.net/",
        options : '?retryWrites=true&w=majority'
    },
    admin_user: {
        username: "admin",
        password: "321nimda",
        email: "admin@admin.com"
    },
   // One_hour :60 * 60 * 1000,       //counts milliseconds   
    //Four_hours: 240 * 60 * 1000,
    session_options:{
        secret: "Another One Bytes the Bit",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: this.Four_hours,     // set to 1 hour   
            httpOnly: false
         }
    },
    mongoose_options:{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    URL: 'mongodb+srv://'
        +this.username+':'
        +this.password+
        '@cluster0-0pwss.mongodb.net/'
        +this.database
        +'?retryWrites=true&w=majority',
}
