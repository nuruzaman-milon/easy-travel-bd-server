const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const partnersRoutes = require("./routes/pratnersRoute");
const availableBusRoutes = require("./routes/availableBusTicketRoute");

//middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aoukuaq.mongodb.net/easy-travel-bd?retryWrites=true&w=majority`
  )
  .then(console.log("connection successfull"))
  .catch((err) => console.error(err));

//routes
app.use("/users", userRoutes);
app.use("/partners", partnersRoutes);
app.use("/available-bus", availableBusRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("server running successfully");
});
