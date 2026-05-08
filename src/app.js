import express from "express";

const app = express();

app.get("/instagram", (req, res) => {
  res.send("You opened a instagram account");
});

export default app