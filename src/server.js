require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT;
const URI = process.env.MONGODB_CONN_STRING;
const connectToMongoDB = require('./config/connect')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser())

//connect to mongodb
connectToMongoDB(URI)

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
