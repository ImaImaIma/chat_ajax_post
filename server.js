"use strict";

var http = require('http');
var fs = require('fs');
var url = require('url');
let arr = new Array();
http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    if(q.pathname == '/index'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    }else if(q.pathname == '/post'){
        if(req.method == 'POST'){
            req.on('data', (chunk) => {
                if(arr.length > 15) arr.shift();
                arr.push(decodeURIComponent(chunk));
                res.writeHead(200, "OK", {'Content-Type': 'text/html'});
                res.end();
            });
        };  
    }else if(q.pathname == '/post/api') {
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end(arr[arr.length - 1]);
    }else if(q.pathname == '/public/style'){
        res.writeHead(200, {'Content-Type': 'text/css'});
        fs.createReadStream(__dirname + '/public/style.css', 'utf8').pipe(res);
    }else{
        res.writeHead(400, "Not found", {'Content-Type': 'text/html'});
        fs.readFile('404.html', (err, data) => {
            res.write(data);
            res.end();
        });
    };
}).listen(8888);

console.log('Server started...')