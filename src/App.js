import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Button from '@mui/material/Button';


// context
import Context from './context/Context';

// container
import ControlPanel from './container/controlPanel/ControlPanel';
import Workspace from './container/workspace/Workspace';
import Viewer from './container/viewer/Viewer';
import Header from './container/header/Header';

// component
import Text from './component/Text';

let HTML_text = "";
const filePath = './test.html';
const fs = require('fs');


function App() {
	// const [currMode, setCurrMode] = useState('');
	
	const [components, setComponents] = useState([
		{	
			"id": 1,
			"type": "Text",
			"outerStyle": {
				"position": "absolute",
				"top": "20px",
				"left": "30px",
				"background-color": "#f0f",
				"height": "60px", // added
				"width": "100px", // added
				"overflow-x": "hidden", // added
				"overflow-y": "hidden", // added
				"padding-left": "10px",
				"padding-top": "10px",
			},
			"innerStyle": {
				"font-family": "'Courier New', Courier, monospace",
				"margin": "0px", // added
				"font-size": "larger", // added
				"color": "#f00", // added
				"height": "60px", // added
				"width": "100px", // added
				"margin-left": "0px",
				"margin-top": "0px",
			},
			"content": {
				"text": "Happy Halloween",
			},
		},
		// {
		// 	"id": 2,
		// 	"type": "Img",
		// 	"outerStyle": {
		// 		"top": "200px",
		// 		"left": "130px",
		// 	},
		// 	"innerStyle": {
		// 	},
		// 	"content": {
		// 		"src": "https://www.w3schools.com/images/w3schools_green.jpg",
		// 		"alt": "fault",
		// 	},
		// },
	]);

	const [type, setType] = useState("Text");
	const [outerStyle, setOuterStyle] = useState({
		"position": "absolute",
		"left": "130px",
		"top": "200px",
		"background-color": "#e3b",
		"width": "120px",
		"height": "240px",
		"overflow-x": "hidden",
		"overflow-y": "hidden",
		// "visibility": "hidden",
	});
	const [innerStyle, setInnerStyle] = useState({
		"margin": "0px", // added
		"height": "60px", // added
		"width": "100px", // added
		"margin-left": "0px",
		"margin-top": "0px",
		"color": "#fff", // added
	});
	const [content, setContent] = useState({"text": "aaaa",});
	const [idCnt, setIdCnt] = useState(3);
	const [currentSelectedId, setCurrentSelectedId] = useState(null);

	const [currentPoint, setCurrentPoint] = useState({
		x: 0,
		y: 0,
	})

	const createComponent = () => {
		console.log(
			"\ntype:", type,
			"\nouterStyle:", outerStyle,
			"\ninnerStyle:", innerStyle,
			"\ncontent:", content,
		)
		setComponents([...components,
			{	
				"id": idCnt,
				"type": type,
				"outerStyle": outerStyle,
				"innerStyle": innerStyle,
				"content": content,
			}
		]);
		setIdCnt(idCnt + 1);
	}

	const updateComponent = (id, props) => {
		// console.log("update component");
		// console.log('props: ', props);
		// console.log('components: ', components);
		for (const v of components) {
			if (v.id == id) {
				if (props.outerStyle !== undefined) v.outerStyle = props.outerStyle;
				if (props.innerStyle !== undefined) v.innerStyle = props.innerStyle;
				if (props.content !== undefined) v.content = props.content;
			}
		}
	}

	const getComponentFromId = (id) => {
		for (const v of components) {
			if (v.id == id) {
				return v;
			}
		}
	}

	const deleteComponent = (id) => {
		const component = getComponentFromId(id);
		if (component) {
			setCurrentSelectedId(null);
			updateComponent(id, {
				outerStyle: {
					...component.outerStyle,
					"visibility": "hidden",
				}
			})
		}
		// console.log(
		// 	"\ntype:", type,
		// 	"\nouterStyle:", component.outerStyle,
		// 	"\ninnerStyle:", component.innerStyle,
		// 	"\ncontent:", component.content,
		// )
	}

	function componentAttr(Attribute, x){
		if (typeof(Attribute) !== 'string'){
			for (let x in Attribute){
				if(x !== "text" && x !== "src" && x !== "alt"){
					HTML_text += x + ':' + Attribute[x] + '; ';
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
		// console.log("Current Id:", currentSelectedId);
		// console.log('components: ', components);
		for (const v of components) {
			if (v.id == currentSelectedId) {
				// console.log('v.type: ', v.type);
				// console.log("`${v.type}`:", `${v.type}`);
				setType(`${v.type}`);
				setOuterStyle(v.outerStyle);
				setInnerStyle(v.innerStyle);
				setContent(v.content);
				break;
			}
		}
	}, [currentSelectedId])

	// useEffect(() => {
	// 	console.log(components);
	// }, [components])


  return (
    <React.Fragment>
			<Context.Provider
				value={{
					createComponent: createComponent,
					createHtml: createHtml,

					components: components,
					setComponents: setComponents,
					type: type,
					setType: setType,
					outerStyle: outerStyle,
					setOuterStyle: setOuterStyle,
					innerStyle: innerStyle,
					setInnerStyle: setInnerStyle,
					content: content,
					setContent: setContent,
					currentSelectedId: currentSelectedId,
					setCurrentSelectedId: setCurrentSelectedId,

					updateComponent: updateComponent,
					getComponentFromId: getComponentFromId,
					currentPoint: currentPoint,
					setCurrentPoint: setCurrentPoint,

					deleteComponent: deleteComponent,
				}}
			>
				{/* <Routes>
					<Route path='/test' element={HTML_text} exact="true"/>
				</Routes> */}
				<Header></Header>
				<ControlPanel></ControlPanel>
				<Workspace></Workspace>
				<Viewer></Viewer>
			</Context.Provider>
		</React.Fragment>
  );
}

export default App;
