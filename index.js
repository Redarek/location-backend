require('dotenv').config();
const sequelize = require('./db')
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./application/middlewares/errorMiddleware');
const fileUpload = require('express-fileupload')

const router = require('./router/index');

const CLIENT_URL = process.env.NODE_ENV === "production" ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'Super Secret rushools', resave: true, saveUninitialized: false, cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
}

const app = express();

app.use(session(sessionConfig));
app.use(express.json());
app.use(fileUpload({limits: {fileSize: 50 * 1024 * 1024}}))
app.use(cookieParser());
app.use(cors({
    credentials: true, origin: CLIENT_URL
}));
app.use('/api/v1', router);
app.use(errorMiddleware); // middleware ошибок всегда последний app.use

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT || 3500, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log('Something went wrong. Please try again', error.message);
        process.exit(1);
    }
}

start();
