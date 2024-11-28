const express = require("express");
const cors = require('cors');
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");




require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.get("/health", (_, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connect();
    console.log(`Server is running on http://localhost:${PORT}`);
});

