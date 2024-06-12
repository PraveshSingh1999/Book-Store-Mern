import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/books.route.js";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("welcome to this Application");
});

// middleware
app.use(express.json());

// middleware to handle CORS policy

// option 1- Allow all origins with Default of cors(*)
app.use(cors());

// option 2- Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Routes
app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database is Connected");
    app.listen(PORT, () => {
      console.log(`server is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error");
  });
