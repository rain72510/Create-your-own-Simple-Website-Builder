import React, { useContext } from "react";
import Context from "../../context/Context";


import "./Viewer.css"

const Viewer = () => {
	return (
		<div className="Viewer">
			<iframe src="iframe/Page42.html" alt="No Content">

			</iframe>
		</div>
	)
}

export default Viewer;