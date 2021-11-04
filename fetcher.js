const net = require('net');
const fs = require('fs');//filestream!!!!! lets us interact with our files!!!!
const conn = net.createConnection({
  host: 'example.edu',
  port: 80
});

conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: example.edu\r\n`);
  conn.write(`\r\n`);
});

//////////////GOT FS writeFile to work!!!//////////////////////
conn.on('data', (data) => {
  new Promise ((resolve) => {
    fs.writeFile(`./example.edu.html`, data, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log('file written')
      resolve();
    })
  }).then(() => {
    fs.readFile(`./example.edu.html`, (err, data) => {
      console.log(`Downloaded and saved ${data.byteLength} bytes to ./example.edu.html.`);
    })
  })
  conn.end();
});
