import React from "react";
import { SketchPicker } from 'react-color';

const ColorPicker = (props) => {
	
	const handleColorChangeComplete = (c) => {
		setTimeout(() => {
			props.setColor(c.hex);
		}, 100)
	}

	return (
		<div
			style={{
				marginLeft: "20px", position: "absolute",
				top: props.position.top, left: props.position.left
			}}
		>
			<SketchPicker
				color={props.color}
				onChange={handleColorChangeComplete}
				onChangeComplete={handleColorChangeComplete}
			/>
		</div>
	)
}

export default ColorPicker;