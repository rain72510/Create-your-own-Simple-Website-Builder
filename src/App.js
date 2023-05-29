import './App.css';
import React, { useState } from 'react';

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
	
	const [items, setItems] = useState({
		"Item1": {
			item: Text,
			positions: {
				gridColumnStart: 3,
				gridColumnEnd: 6,
				gridRowStart: 7,
				gridRowEnd: 13,
			},
			styles: {
				color: "yellow",
				backgroundColor: "greenyellow"
			}
		},
	});

	// setComponents({
	// 	"Item1": {
	// 		item: Text,
	// 		positions: {
	// 			gridColumnStart: 3,
	// 			gridColumnEnd: 6,
	// 			gridRowStart: 7,
	// 			gridRowEnd: 13,
	// 		},
	// 		styles: {
	// 			color: "yellow",
	// 			backgroundColor: "greenyellow"
	// 		}
	// 	},
	// })


  return (
    <React.Fragment>
			<Context.Provider
				value={{
					currMode: currMode,
					setCurrMode: setCurrMode,
				}}
			>
				<ControlPanel></ControlPanel>
				<Workspace items={items}></Workspace>
				<Viewer></Viewer>
			</Context.Provider>
		</React.Fragment>
  );
}

export default App;
