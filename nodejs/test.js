const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
  console.log("bbb");
  res.send("<h1>Welcome</h1>");
});

app.listen(8080, ()=> {
  console.log("Listening: 8080");
});
