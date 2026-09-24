import express from "express";
import { startups } from "./Data/data.js";
const app = express();
app.get("/api", (req, res) => {
  // const url = new URL(req.url, `http://${req.headers.host}`);
  // let searchParams = Object.fromEntries(url.searchParams)
  // console.log(searchParams) to extract the search params from the pure node
  console.log(req.query); //searchParams express ;
  const queryParams = req.query;
  let filteredData = startups.filter((data) => {
    for (let query in queryParams) {
      const key = query.toLowerCase();

      if (!(key in data)) return false;
      if (data[key] !== queryParams[query]) return false;
    }

    return true;
  });
  console.log(filteredData)
  res.json(filteredData);
});
app.listen(5200, () => console.log("the server is started on port 5200"));
