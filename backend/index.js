const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/authRoute");
const saleRouter = require("./routes/SaleRoute");
// const rentRouter = require("./routes/RentRoute");

app.use("/api/auth", authRouter);
app.use("/api/estate-sale", saleRouter);
// app.use("/api/estate-rent", rentRouter);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected successfully!!");
    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
  });