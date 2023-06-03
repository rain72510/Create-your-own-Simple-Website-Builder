import { createContext } from "react";

const Context = createContext({
	// currMode: '',
	// setCurrMode: () => {},
	// components: [],
	// componentStyle: {},
	// setComponentStyle: () => {},
	createComponent: () => {},
	components: [],
	setComponents: () => {},
	type: '',
	setType: () => {},
	outerStyle: {},
	setOuterStyle: () => {},
	innerStyle: {},
	setInnerStyle: () => {},
	content: {},
	setContent: () => {},
	currentSelectedId: null,
	setCurrentSelectedId: () => {},
	updateComponent: () => {},
});

export default Context;