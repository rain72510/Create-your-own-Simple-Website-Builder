const express = require('express');
const app = express();
const fs = require("fs");
const frontendPort = 3000;
const backendPort = 8080;

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', `http://localhost:${frontendPort}`);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Max-Age', '86400'); // 預檢請求的快取時間（秒）
	next();
});


var toFile = `
<!DOCTYPE html>
<html>
	<head>
    <meta charset="UTF-8" />
		<link rel="stylesheet" href="./Page1.css" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
	</head>
	<body>
		<div style="background-color: yellowgreen;">
			<p>
				This is html2
			</p>
		</div>
	</body>
</html>
`

// const CreateWriteFile = () => {

// }

app.post('/api/generateHtml', (req, res) => {
	console.log("Receive call: generateHtml");
	const id = req.body.id;
	console.log(id)
	fs.writeFile(
		`./public/iframe/Page${id}.html`,
		toFile,
		(err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ err: 'Error in writing files'})
			}
			res.json({ message: "Html generate done"});
		}
	)
});


app.listen(backendPort, () => {
	console.log(`Listen on ${backendPort}`);
})