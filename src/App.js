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


let HTML_text = "";
const filePath = './test.html';
const fs = require('fs');


function App() {

	const [htmlFileCount, setHtmlFileCount] = useState(12);
	const [HTMLText, setHTMLText] = useState("");
	
	const [components, setComponents] = useState([
		{	
			"id": 1,
			"type": "Text",
			"outerStyle": {
				"position": "absolute",
				"top": "20px",
				"left": "30px",
				"background-color": "rgb(43, 62, 99)",
				"height": "60px", // added
				"width": "100px", // added
				"overflow-x": "hidden", // added
				"overflow-y": "hidden", // added
			},
			"innerStyle": {
				"font-family": "'Courier New', Courier, monospace",
				"margin": "0px", // added
				"font-size": "16", // added
				"color": "#53acff", // added
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
		"height": "150px", // added
		"width": "300px", // added
		"margin-left": "0px",
		"margin-top": "0px",
		// "color": "#f00", // added
		"color": "#000", // added
		"font-size": "14", // added
	});
	const [textContent, setTextContent] = useState({"text": "aaaa",});
	const [imgContent, setImgContent] = useState({});
	const [idCnt, setIdCnt] = useState(3);
	const [currentSelectedId, setCurrentSelectedId] = useState(null);

	const [currentPoint, setCurrentPoint] = useState({
		x: 0,
		y: 0,
	})

	const [previousPoint, setPreviousPoint] = useState({
		x: 0,
		y: 0,
	})

	const [delta, setDelta] = useState({
		x: 0,
		y: 0,
	})

	useEffect(() => {
		setDelta({
			x: currentPoint.x - previousPoint.x,
			y: currentPoint.y - previousPoint.y,
		})
	}, [currentPoint, previousPoint])

	const createComponent = () => {
		// console.log(
		// 	"\ntype:", type,
		// 	"\nouterStyle:", outerStyle,
		// 	"\ninnerStyle:", innerStyle,
		// 	"\ntextContent:", textContent,
		// )
		switch (type) {
			case "Text":
				setComponents([...components,
					{	
						"id": idCnt,
						"type": type,
						"outerStyle": outerStyle,
						"innerStyle": innerStyle,
						"content": textContent,
					}
				]);
				break;
			
			case "Img":
				setComponents([...components,
					{	
						"id": idCnt,
						"type": type,
						"outerStyle": outerStyle,
						"innerStyle": innerStyle,
						"content": imgContent,
					}
				]);
				break;
		}
		setIdCnt(idCnt + 1);
	}

	const updateComponent = (id, props) => {
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
		// console.log(Attribute);
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
		setHTMLText(HTML_text);
		// console.log(HTML_text);
	}

	useEffect(() => {
		for (const v of components) {
			if (v.id == currentSelectedId) {
				switch (v.type) {
					case "Text":
						setTextContent(v.content);
						break;
					case "Img":
						setImgContent(v.content);
						break;
				}
				setType(`${v.type}`);
				setOuterStyle(v.outerStyle);
				console.log(v.innerStyle);
				setInnerStyle(v.innerStyle);
				break;
			}
		}
		console.log('innerStyle: ', innerStyle);
	}, [currentSelectedId])

	useEffect(() => {
		console.log('textContent:', textContent, 'imgContent: ', imgContent);
	}, [textContent, imgContent])


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
					textContent: textContent,
					setTextContent: setTextContent,
					imgContent: imgContent,
					setImgContent: setImgContent,

					currentSelectedId: currentSelectedId,
					setCurrentSelectedId: setCurrentSelectedId,

					updateComponent: updateComponent,
					getComponentFromId: getComponentFromId,

					currentPoint: currentPoint,
					setCurrentPoint: setCurrentPoint,
					previousPoint: previousPoint,
					setPreviousPoint: setPreviousPoint,
					delta: delta,
					setDelta: setDelta,

					deleteComponent: deleteComponent,
					htmlFileCount: htmlFileCount,
					setHtmlFileCount: setHtmlFileCount,
					HTMLText: HTMLText
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
