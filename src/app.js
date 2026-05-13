import express from "express";
import cors from 'cors'

const app = express();

// basic configurations

// Reads JSON body
app.use(express.json({limit:'16kb'}));
// Reads form data
app.use(express.urlencoded({extended:true, limit:'16kb'}));
// Serves static files like images/CSS/JS
app.use(express.static('public'));


// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);
// import the routers
import router from "./routes/healthcheack.routes.js";

app.use('/api/v1/healthcheck',router)

app.get("/instagram", (req, res) => {
  res.send("You opened a instagram account");
});

export default app