import express from "express";
import cors from "cors";
import routes from "./routes/index.mjs";
import db from "./config/db.mjs";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  Credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/", routes);

app.listen(3001, () => {
  console.log("Server is running  on port 3001");
});

db.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
