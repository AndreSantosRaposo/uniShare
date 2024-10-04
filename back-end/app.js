const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors'); //Lidar com os erros autonomamente
const cors = require('cors');
//Routers
const authRouter = require('./routes/auth');
const fileRouter = require('./routes/files');
const cadeirasRouter = require('./routes/cadeiras');
const usersRouter = require('./routes/users');
//Connect to DB
const connectDb = require('./db/connectDb');

//Port
const port = process.env.PORT || 3000;

//Cors
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your frontend origin
    methods: ['GET', 'POST',"PUT"],  // Specify allowed methods
    credentials: true
}));

//Middleware
app.use(express.json()); // Middleware to parse JSON bodies
const errorHandlerMiddleware = require('./middleware/errorHandler');

//Routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/files',fileRouter);
app.use('/api/v1/cadeiras',cadeirasRouter);
app.use('/api/v1/users',usersRouter);

app.use(errorHandlerMiddleware);

async function start(){
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(3000,()=>{
            console.log(`Server listening to port ${port}`);
        })
    }catch(err){
        console.log(err);
    }
}

start()