import './App.css';
import React, { useEffect, useState } from 'react';

// context
import Context from './context/Context';

// container
import ControlPanel from './container/controlPanel/ControlPanel';
import Workspace from './container/workspace/Workspace';
import Viewer from './container/viewer/Viewer';

// component
import Text from './component/Text';

function App() {
	const [currMode, setCurrMode] = useState('');
	
	const [components, setComponents] = useState([
		{
			"component": "Text",
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
			component: "Img",
			"outerStyle": {
				"top": "200px",
				"left": "130px",
			},
			"innerStyle": {
			},
			"content": {
				"src": "aa",
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
					component: Text,
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
				}}
			>
				<ControlPanel></ControlPanel>
				<Workspace></Workspace>
				<Viewer></Viewer>
			</Context.Provider>
		</React.Fragment>
  );
}

export default App;
