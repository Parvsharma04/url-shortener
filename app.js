const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;

app.post("/url", (req, res) => {
  // console.log(req.body);

  const data = JSON.parse(fs.readFileSync("url.json"));
  // console.log(data);
  let ele = data.find((ele) => ele.url === entry.url);

  if (!ele) {
    let entry = {
      id: uuidv4(),
      url: req.body.url,
    };
    data.push(entry);
    fs.writeFileSync("url.json", JSON.stringify(data));
  } else if (ele) {
    res.json({ newUrl: `http://localhost:8000/${ele.id}` });
  }
  res.json({ newUrl: `http://localhost:8000/${entry.id}` });
});

app.get("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("url.json"));
  data.forEach((ele) => {
    if (req.params.id == ele.id) {
      res.redirect(ele.url);
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
