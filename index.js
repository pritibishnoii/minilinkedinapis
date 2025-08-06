import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/index.js';
import authRouter from './routes/authRoute.js';
import postRouter from './routes/postRoute.js';
import userRouter from './routes/userRoute.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}🎊🎊🎊🎊`);
        });
    })
    .catch((err) => {
        console.log('Error in connecting to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send(' server is started👻👻');
});

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
