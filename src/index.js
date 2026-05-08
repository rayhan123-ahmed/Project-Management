import dotenv from "dotenv";
import express from "express";
dotenv.config({
  path: "./.env",
});

const app = express();
const port =process.env.PORT || 3000;

app.get('/instagram',(req,res)=>{
     res.send("This is a instagram account");
})

app.listen(port,()=>{
   console.log(`app listing on port http://localhost:${port}` );
   
})


