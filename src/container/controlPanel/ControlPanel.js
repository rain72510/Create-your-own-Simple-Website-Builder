import React, { useContext, useState } from "react";
import Context from "../../context/Context";

import "./ControlPanel.css";

const NumberInput = (props) => {
	return (
		<div>
			<p>{props.name}</p>
			<input
				type="number"
				value={props.value}
				onChange={(e) => {props.onChange(e.target.value)}}
				style={{
					width: "50px",
					height: "20px",
				}}
			>
			</input>
		</div>
	)
}

const PositionInput = () => {
	const {
		outerStyle,
		setOuterStyle,
		currentSelectedId,
		updateComponent,
	} = useContext(Context);
	return (
		<div>
			<NumberInput name="Width" value={parseFloat(outerStyle.width)} onChange={(v) => {
				const currOuterStyle = outerStyle;
				setOuterStyle({...currOuterStyle, width: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"outerStyle": {
						...currOuterStyle, width: `${v}px`,
					}});
				}
			}}/>
			<NumberInput name="Height" value={parseFloat(outerStyle.height)} onChange={(v) => {
				const currOuterStyle = outerStyle;
				setOuterStyle({...currOuterStyle, height: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"outerStyle": {
						...currOuterStyle, height: `${v}px`,
					}});
				}
			}}/>
			<NumberInput name="Top" value={parseFloat(outerStyle.top)} onChange={(v) => {
				const currOuterStyle = outerStyle;
				setOuterStyle({...currOuterStyle, top: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"outerStyle": {
						...currOuterStyle, top: `${v}px`,
					}});
				}
			}}/>
			<NumberInput name="Left" value={parseFloat(outerStyle.left)} onChange={(v) => {
				const currOuterStyle = outerStyle;
				setOuterStyle({...currOuterStyle, left: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"outerStyle": {
						...currOuterStyle, left: `${v}px`,
					}});
				}
			}}/>
		</div>
	)
}

const ControlPanel = () => {
	const {
		createComponent,
		setComponent,
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
					setComponent("Text");
				}}
			>
				Text
			</button>
			
			<button
				onClick={() => {
					writeToFile();
				}}
			>
				writeToFile
			</button>
			<PositionInput/>
			<button
				onClick={() => {
					createComponent();
				}}
			>
				Create!
			</button>
		</div>
	)
}

export default ControlPanel;