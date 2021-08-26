const express = require("express");
const path = require("path");
const { conn } = require("./db");
const app = express();

app.use('/dist', express.static(path.join(__dirname, "..", "dist")))
app.use('/public', express.static(path.join(__dirname, "..", "public")))
app.use("/api", require("./api"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "src", "index.html"));
});

async function init() {
  await conn.sync();
  const port = process.env.PORT || 8021;
  app.listen(port, () =>
    console.log(
      `App listening on port ${port}
      
      http://localhost:${port}/
      `
    )
  );
}

init();
