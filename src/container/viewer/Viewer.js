import React, { useContext } from "react";
import Context from "../../context/Context";


import "./Viewer.css"

const Viewer = () => {
	const {
		htmlFileCount
	} = useContext(Context);
	var filename = `iframe/Page${htmlFileCount - 1}.html`
	console.log('filename: ', filename);
	return (
		<div className="Viewer">
			<iframe src={filename} alt="No Content">

			</iframe>
		</div>
	)
}

export default Viewer;