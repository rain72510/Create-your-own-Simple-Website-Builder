import React, { useContext } from "react";
import Context from "../../context/Context";


import "./Workspace.css"

const Workspace = () => {
	const {
		currMode,
		setCurrMode,
	} = useContext(Context);


	return (
		<div className="Workspace">
			<iframe src="iframe/Page1.html">

			</iframe>
		</div>
	)
}

export default Workspace;