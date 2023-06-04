import { createContext } from "react";

const Context = createContext({
	createComponent: () => {},
	createHtml: () => {},
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
	getComponentFromId: () => {},
	currentPoint: () => {},
	setCurrentPoint: () => {},

	deleteComponent: () => {},
});

export default Context;