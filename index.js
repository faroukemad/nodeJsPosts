const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);


mongoose
  .connect("mongodb://localhost/posts")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
