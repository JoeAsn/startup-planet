import express from "express";
import { startups } from "./Data/data.js";

const app = express();

app.get("/api", (req, res) => {
  const queryParams = req.query;
  let filteredData = startups.filter((data) => {
    for (let query in queryParams) {
      const key = query.toLowerCase();
      if (!(key in data)) return false;
      if (typeof data[key] === "string") {
        if (data[key].toLowerCase() !== queryParams[query].toLowerCase()) {
          return false;
        }
      } else if (typeof data[key] === "boolean") {
        if (data[key] !== (queryParams[query] === "true")) {
          return false;
        }
      } else if (typeof data[key] === "number") {
        if (data[key] !== Number(queryParams[query])) {
          return false;
        }
      }
    }

    return true;
  });

  res.json(filteredData);
});
app.get("/api/:filed/:term", (req, res) => {
  let paramsObj = req.params;
  let filteredData = startups.filter((data) => {
    if(paramsObj.term.toLowerCase() === "true" || "false" ){
      return String(data[paramsObj.filed]).toLocaleLowerCase() === paramsObj.term.toLocaleLowerCase()
    }
    return data[paramsObj.filed].toLowerCase() === paramsObj.term.toLocaleLowerCase();
  });
  res.json(filteredData)
});
app.listen(5200, () => {
  console.log("The server is started on port 5200");
});