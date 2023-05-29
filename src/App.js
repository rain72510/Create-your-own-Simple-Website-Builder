import './App.css';
import React, { useState } from 'react';

// context
import Context from './context/Context';

// container
import ControlPanel from './container/controlPanel/ControlPanel';
import Workspace from './container/workspace/Workspace';


function App() {
	const [currMode, setCurrMode] = useState('');



  return (
    <React.Fragment>
			<Context.Provider
				value={{
					currMode: currMode,
					setCurrMode: setCurrMode,
				}}
			>
				<ControlPanel></ControlPanel>
				<Workspace></Workspace>
			</Context.Provider>
		</React.Fragment>
  );
}

export default App;
