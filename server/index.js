const express = require("express");
const  connect  = require("./dbconnection.js");
const deptRouter = require("./routes/deptroute.js");
const sprefComRouter = require("./routes/sprefroute.js");
const lieuvoteRouter = require("./routes/lieuvoteroute.js");
const voterRouter = require("./routes/voterroute.js");
const userRouter = require("./routes/userroute.js");
require("dotenv").config();

const PORT = process.env.API_PORT || 3001;

const app = express();
app.use(express.json());

app.use("/api/depts", deptRouter);
app.use("/api/sprefs-com", sprefComRouter);
app.use("/api/lieuvote", lieuvoteRouter);
app.use("/api/voter", voterRouter);
app.use("/api/users", userRouter);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
})

app.get("/api/status", (req, res) => {
    connect.testConnection().then((msg) => {
        res.json({status: msg});
        console.log(`Message : ${msg}`);
    });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});