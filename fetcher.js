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
  // console.log(data);//switch to function that saves file --> where we create ${fileSize}
  fs.writeFile(`./example.edu.html`, data, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('file written')
  }) 
  // fileSize(somethingGoesHere)//CURRENTLY A PLACEHOLDER
  console.log(`Downloaded and saved {fileSize} bytes to ./index.html.`); // Currently looks for something that does not YET exist
  conn.end();
});
