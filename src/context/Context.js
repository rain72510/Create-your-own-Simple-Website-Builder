import { createContext } from "react";

const Context = createContext({
	currMode: '',
	setCurrMode: () => {},
});

export default Context;