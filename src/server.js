require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT;
const URI = process.env.MONGODB_CONN_STRING;
const API_URL = process.env.API_URL;
const connectToMongoDB = require("./config/connect");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route")
const otpRouter = require("./routes/otp.route")

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//api endpoints
app.use(`${API_URL}/auth`, authRouter);
app.use(`${API_URL}/users`, userRouter);
app.use(`${API_URL}/otp`, otpRouter);

//connect to mongodb
connectToMongoDB(URI);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
