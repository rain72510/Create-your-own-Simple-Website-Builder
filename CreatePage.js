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
<!DOCTYPE html><html><body><div><p style="position:absolute; top:274px; left:293px; background-color:#f0f; height:60px; width:100px; font-family:'Courier New', Courier, monospace; margin:0px; font-size:larger; color:red; ">Happy Halloween</p></div><div><img style="top:200px; left:130px; " src="https://www.w3schools.com/images/w3schools_green.jpg" alt="fault"></div><div><p style="position:absolute; top:119px; left:115px; background-color:#f0f; height:60px; width:100px; font-family:'Courier New', Courier, monospace; margin:0px; font-size:larger; color:red; ">Happy Halloween</p></div><div><p style="position:absolute; top:138px; left:261px; background-color:#f0f; height:60px; width:100px; font-family:'Courier New', Courier, monospace; margin:0px; font-size:larger; color:red; ">Happy Halloween</p></div><div><p style="position:absolute; top:364px; left:89px; background-color:#f0f; height:60px; width:100px; font-family:'Courier New', Courier, monospace; margin:0px; font-size:larger; color:red; ">Happy Halloween</p></div></body></html>
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