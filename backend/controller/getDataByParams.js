import { startups } from "../Data/data.js";
export function getDataByParams(req, res){
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
}