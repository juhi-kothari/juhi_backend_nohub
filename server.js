const http = require('http');
const { text } = require('stream/consumers');

const port=8000;

const server = http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello world');
})

server.listen(port,()=>{
    console.log('server started at localhost',port);
})