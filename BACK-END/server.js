const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const loginRouter = require('./routers/loginRoute')
const productRouter = require('./routers/productRoute')
const order = require('./routers/orderRoute')
const cartRoute = require('./routers/cartRoute')
const profileRoute = require('./routers/profileRoute')
const databaseCn = require('./database/db');
const cors = require('cors')

app.use(cors({
   origin: "http://localhost:5173",
   credentials: true, 
 }));

app.use(cookieParser());
app.use(express.json());
app.use('/',loginRouter)
app.use('/products',productRouter)
app.use('/order',order)
app.use('/cart',cartRoute)
app.use('/profile',profileRoute)


databaseCn();

app.listen(process.env.PORT,(err)=>{
    if(err){
       console.error(err);
    }else{
    console.log('server running successfully...');
    }
 })