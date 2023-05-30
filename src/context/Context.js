import { createContext } from "react";

const Context = createContext({
	currMode: '',
	setCurrMode: () => {},
	components: [],
	componentStyle: {},
	setComponentStyle: () => {},
	createComponent: () => {},
});

export default Context;