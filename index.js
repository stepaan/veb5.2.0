'use strict';

const http = require ('http');
const fs = require ('fs');
const port = process.env.PORT || 5050;
const sendData = (file, type, res) => {
	let stream = fs.createReadStream(file);
	stream.on('open',() => {
		res.setHeader('Const-Type', type);
		stream.pipe(res);
	});
	stream.on('error', () => {
		res.setHeader('Const-Type', type);
		res.statusCode = 404;
		res.end('Not found');
	})
}
const routing = {
	'/': sendData.bind(null, 'laba48.html', 'text/html'),
	'/style7.css': sendData.bind(null, 'style7.css', 'text/css')
};
const server = http.createServer((req,res) => {
	if(req.method !== 'GET')
	{
		res.statusCode = 501;
		res.setHeader('Content-Type', 'text/plain');
		return res.end('Metod  not implemented')
	}
	const dataSender = routing[req.url];
	dataSender(res);
	});
server.listen(port);