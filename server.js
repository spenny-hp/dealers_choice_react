const express = require("express");
const path = require("path");
const { conn } = require("./db");
const app = express();

app.use("/api", require("./api"));
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname,'client', 'index.html'))
})

async function init() {
  await conn.sync();
  const port = process.env.PORT || 8021;
  app.listen(port, () =>
    console.log(
      `App listening on port ${port}
      
      http://localhost/${port}
      `
    )
  );
}

init();
