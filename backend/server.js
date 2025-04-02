import express from  'express'
import connectionToDB from './conf/db.js'
import bodyParser from 'express'
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import userRouter from '../backend/routes/user.routes.js'
import userRouter from './routes/user.routes.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: [
        /^http:\/\/127\.0\.0\.1:\d+$/,  // Allows localhost with any port
        "http://frontend-service:80",   // Allows requests from the frontend service in Kubernetes
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/user',userRouter)

app.get("/", (req, res) => {
    res.json({ message: "Hello from Abhishek Yadav!" });
});


// port listen 
app.listen(PORT,"0.0.0.0" ,async()=>{
    await connectionToDB()
    console.log(`Server is running at http://localhost:${PORT}`);
})
 
