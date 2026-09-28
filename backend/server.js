import express from "express";
import { startups } from "./Data/data.js";

const app = express();
app.use(express.json()) // here it parses a Json auto when it detects the content-type of the request is JSON.
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
    if (paramsObj.term.toLowerCase() === "true" || "false") {
      return (
        String(data[paramsObj.filed]).toLocaleLowerCase() ===
        paramsObj.term.toLocaleLowerCase()
      );
    }
    return (
      data[paramsObj.filed].toLowerCase() === paramsObj.term.toLocaleLowerCase()
    );
  });
  res.json(filteredData);
});
// add the chained routing ;
app.options("/api1", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.sendStatus(204);
});

app.route("/api1")
  .get((req, res) => {
    const queryParams = req.query;

    let filteredData = startups.filter((data) => {
      for (let query in queryParams) {
        const key = query.toLowerCase();

        if (!(key in data)) return false;

        if (typeof data[key] === "string") {
          if (
            data[key].toLowerCase() !==
            queryParams[query].toLowerCase()
          ) {
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
  })

  .post((req, res) => {
    const newStartup = req.body;

    // Basic validation
    if (!newStartup || Object.keys(newStartup).length === 0) {
      return res.status(400).json({
        error: "Request body cannot be empty",
      });
    }

    startups.push(newStartup);

    res.status(201).json({
      message: "Startup created successfully",
      data: newStartup,
    });
  });
app.listen(5200, () => {
  console.log("The server is started on port 5200");
});
