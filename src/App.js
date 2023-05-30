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
			component: Text,
			outerStyle: {
				gridColumnStart: 3,
				gridColumnEnd: 6,
				gridRowStart: 7,
				gridRowEnd: 13,
				zIndex: "1",
				background: "yellow",
				padding: "20px",
				margin: "10px",
			},
			innerStyle: {
				color: "yellow",
				backgroundColor: "greenyellow",
			},
			content: {
				text: "Happy Halloween",
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
