import React, { useContext } from "react";
import Context from "../../context/Context";

import "./ControlPanel.css";

const ControlPanel = () => {
	const {
		currMode,
		setCurrMode,
	} = useContext(Context);

	const writeToFile = () => {
		fetch("http://localhost:8080/api/generateHtml", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: 2,
			})
		})
		.then((res) => {
			if (res.ok) {
				console.log('Success');
			} else {
				console.error('Receive error')
			}
		})
		.catch((err) => {
			console.error(err);
		});
	}

	return (
		<div className="ControlPanel">
			<button
				onClick={() => {
					writeToFile();
				}}
			>
				writeToFile
			</button>
		</div>
	)
}

export default ControlPanel;