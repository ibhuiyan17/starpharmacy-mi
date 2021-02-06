const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  const filePath = __dirname + (req.url === '/' ? '/index.html' : req.url); // redirect '/' -> '/index.html'
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  })
}).listen(port, () => {
  console.log(`Server intialized, Listening on port ${port}`);
})
