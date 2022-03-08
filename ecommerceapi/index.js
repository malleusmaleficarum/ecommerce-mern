const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const mailChimpRoute = require("./routes/mailChimp");
const journalRoute = require("./routes/journal");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

//its promise so need then (if success) and catch (if fail)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db Connection Successful"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json()); //to use JSON file
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/mailchimp", mailChimpRoute);
app.use("/api/journals", journalRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is Running");
});
