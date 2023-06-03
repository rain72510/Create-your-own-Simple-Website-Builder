import { createContext } from "react";

const Context = createContext({
	currMode: '',
	setCurrMode: () => {},
	components: [],
	componentStyle: {},
	setComponentStyle: () => {},
	createComponent: () => {},
	createHtml: () => {},
});

export default Context;