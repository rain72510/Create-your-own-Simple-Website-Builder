import React, { useContext } from "react";
import Context from "../../context/Context";


import "./Viewer.css"

const Viewer = () => {
	return (
		<div className="Viewer">
			<iframe src="iframe/Page1.html">

			</iframe>
		</div>
	)
}

export default Viewer;