import express from "express";
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/post.js';
import searchRouter from './routes/search.js';
import likesRouter from './routes/likes.js';
import friendShipRouter from './routes/friendShip.js';
import commentRouter from './routes/comment.js';
import uploadRouter from './routes/upload.js';
import bodyParser from "body-parser";
import cors from "cors"
//import cookieParser from "cookie-parser";
//import chat from './routes/chat.js';
import feedbackRoutes from "./routes/feedback.js"


const app = express();
const porta = 5000;


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
//app.use(cookieParser());


app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/search',searchRouter);
app.use('/api/friendShip',friendShipRouter);
app.use('/api/post',postRouter);
app.use('/api/likes',likesRouter);
app.use('/api/comment/',commentRouter);
app.use('/api/upload',uploadRouter);
//app.use('/api/chat/',chat);
app.use('/api/feedback/', feedbackRoutes);




app.listen(porta,()=>{
    console.log(`servidor rodando na porta ${porta} `);

})

