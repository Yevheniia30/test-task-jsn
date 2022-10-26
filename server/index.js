require("dotenv").config();
const path = require("path");
const express = require("express");
const sequelize = require("./db");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("./routes/heroRouter");
const models = require("./models/models");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "uploads")));
// app.use(fileUpload({}));
app.use("/api", router);

// error handling must be the last middleware
app.use(errorHandler);

// app.get('/', (req, res)=>{
// res.status(200).json({message: 'woooorkiiing'})
// })

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, console.log(`server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
