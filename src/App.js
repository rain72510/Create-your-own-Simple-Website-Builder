import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";


// context
import Context from './context/Context';

// container
import ControlPanel from './container/controlPanel/ControlPanel';
import Workspace from './container/workspace/Workspace';
import Viewer from './container/viewer/Viewer';

// component
import Text from './component/Text';

let HTML_text = "";
const filePath = './test.html';
const fs = require('fs');


function App() {
	const [currMode, setCurrMode] = useState('');
	
	const [components, setComponents] = useState([
		{
			"type": "Text",
			"outerStyle": {
				"top": "20px",
				"left": "30px",
				"background-color": "#f0f",
			},
			"innerStyle": {
				"font-family": "'Courier New', Courier, monospace",
			},
			"content": {
				"text": "Happy Halloween",
			},
		},
		{
			"type": "Img",
			"outerStyle": {
				"top": "200px",
				"left": "130px",
			},
			"innerStyle": {
			},
			"content": {
				"src": "https://www.w3schools.com/images/w3schools_green.jpg",
				"alt": "fault",
			},
		},
	]);

	const [componentStyle, setComponentStyle] = useState({
		gridColumnStart: 0,
		gridColumnEnd: 0,
		gridRowStart: 0,
		gridRowEnd: 0,
	});


	const createComponent = () => {
		switch (currMode) {
			case "Text":
				setComponents([...components, {
					type: "Text",
					outerStyle: componentStyle,
					innerStyle: {
						color: "yellow",
						backgroundColor: "greenyellow",
					},
					content: {
						text: "Happy Christmas",
					},
				}])
				break;
		}
	}

	function componentAttr(Attribute, x){
		if (typeof(Attribute) !== 'string'){
			for (let x in Attribute){
				if(x !== "text" && x !== "src" && x !== "alt"){
					HTML_text += x + '=' + Attribute[x] + '; ';
				}
			}
		}
		console.log(Attribute);
	}

	const createHtml = () => {
		HTML_text = "<!DOCTYPE html><html><body>";
		for (let x in components){
			HTML_text += "<div>";
			switch (components[x]["type"]) {
				case "Text":
					HTML_text += '<p style="';
					break;
				case "Img":
					HTML_text += '<img style="';
					break;
			}
			for (let y in components[x]){
				componentAttr(components[x][y], x)
			}
			switch(components[x]["type"]) {
				case "Text":
					HTML_text += '">' + components[x]["content"]["text"] + "</p>";
					break;
				case "Img":
					HTML_text += '" src="' + components[x]["content"]["src"] + '" alt="' + components[x]["content"]["alt"] + '">';
					break;
			}
			HTML_text += "</div>"
		}
		HTML_text += "</body></html>";
		console.log(HTML_text);
	}

	useEffect(() => {
		console.log(components);
	}, [components])


  return (
    <React.Fragment>
			<Context.Provider
				value={{
					currMode: currMode,
					setCurrMode: setCurrMode,
					components: components,
					componentStyle: componentStyle,
					setComponentStyle: setComponentStyle,
					createComponent: createComponent,
					createHtml: createHtml,
				}}
			>
				<Routes>
					<Route path='/test' element={HTML_text}/>
				</Routes>
				<ControlPanel></ControlPanel>
				<Workspace></Workspace>
				<Viewer></Viewer>
			</Context.Provider>
		</React.Fragment>
  );
}

export default App;
