import React, { useContext, useState } from "react";
import Context from "../../context/Context";

import "./ControlPanel.css";

const Selection = (props) => {
	return (
		<select value={props.value} onChange={(e) => {
			props.onChange(e.target.value)
		}}>
			{Array(props.number).fill().map((v, i) => {
				return <option key={i} value={i+1}>{i+1}</option>
			})}
		</select>
	)
}

const PositionInput = () => {
	const {
		componentStyle,
		setComponentStyle,
	} = useContext(Context);

	// const [columnStart, setColumnstart] = useState(0);
	return (
		<div>
			<p>column start</p>
			<Selection
				value={componentStyle.gridColumnStart}
				onChange={(v) => {
					setComponentStyle({...componentStyle, gridColumnStart: v});
				}}
				number={16}
			></Selection>
			<p>column end</p>
			<Selection
				value={componentStyle.gridColumnEnd}
				onChange={(v) => {
					setComponentStyle({...componentStyle, gridColumnEnd: v});
				}}
				number={16}
			></Selection>
			<p>row start</p>
			<Selection
				value={componentStyle.gridRowStart}
				onChange={(v) => {
					setComponentStyle({...componentStyle, gridRowStart: v});
				}}
				number={16}
			></Selection>
			<p>row end</p>
			<Selection
				value={componentStyle.gridRowEnd}
				onChange={(v) => {
					setComponentStyle({...componentStyle, gridRowEnd: v});
				}}
				number={16}
			></Selection>
		</div>
	)
}

const ControlPanel = () => {
	const {
		currMode,
		setCurrMode,
		createComponent,
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
					setCurrMode("Text");
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