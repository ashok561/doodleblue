const express= require('express');
const dotenv = require('dotenv');

const auth = require('./routes/auth');
const product = require('./routes/product');
const order = require('./routes/order');



const errorHandler =  require('./middleware/error');
const connectDB = require('./config/db');
//load env
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();
app.use(express.json())

app.use('/api/v1/auth', auth);
app.use('/api/v1/product', product);
app.use('/api/v1/order', order);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`server on ${process.env.NODE_ENV} mode on ${PORT}`))


process.on('unhandledRejection', (err, promise)=>{
    console.log(`error ${err.message}`);
    server.close(()=>process.exit(1))
})
