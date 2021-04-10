const express = require('express')
const app = express()

// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})