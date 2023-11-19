const express = require("express");
const cors = require("cors");
const data = require("./data.json")
// const mongoDb = require("./mongoDb")
const userRouter = require("./Router/user.router.js")

const app = express();
app.use(express.json())
app.use(cors());
// app.use("/user",userRouter);

app.get("/data", (req, res) => {
  res.status(200).json(data)
})
app.get("/", (req, res) => {
  res.send("Moonshot Data Visulization Server")
})


app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something Went wrong!!" })
})

app.use((req, res) => {
  res.status(404).json({ error: "Requested API endpoint does not exist" })
})

app.listen(3000, () => {
  console.log("Server started")
})   