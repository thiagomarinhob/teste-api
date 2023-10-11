import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";
import express from "express";

const app = express();

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    console.log("DATABASE CONNECT");
  })
  .catch((error) => console.log(error));

app.listen(3000, () => console.log("SERVER IS RUNNING"));
