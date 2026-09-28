import express from "express";
import {router} from "./routes/router.js"
const app = express();
app.use(express.json()) // here it parses a Json auto when it detects the content-type of the request is JSON.
app.use("/api" , router)
app.listen(5200, () => {
  console.log("The server is started on port 5200");
});
