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
	textContent: {},
	setTextContent: () => {},
	imgContent: {},
	setImgContent: () => {},


	currentSelectedId: null,
	setCurrentSelectedId: () => {},
	updateComponent: () => {},
	getComponentFromId: () => {},
	currentPoint: () => {},
	setCurrentPoint: () => {},

	deleteComponent: () => {},
	HTML_text: "",
	htmlFileCount: 0,
	setHtmlFileCount: () => {},

	HTMLText: "",
});

export default Context;