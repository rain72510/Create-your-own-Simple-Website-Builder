import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";

import ColorPicker from "./ColorPicker";

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

const OuterStylePositionInput = () => {
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
			<NumberInput name="Left" value={parseFloat(outerStyle.left)} onChange={(v) => {
				const currOuterStyle = outerStyle;
				setOuterStyle({...currOuterStyle, left: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"outerStyle": {
						...currOuterStyle, left: `${v}px`,
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
		</div>
	)
}

const ColorInput = (props) => {
	const [color, setColor] = useState(props.value);
	const [showColorPicker, setShowColorPicker] = useState(false);

	useEffect(() => {
		props.onChange(color);
	}, [color])

	return (
		<div>
			<p>{props.name}</p>
			<div style={{display: "flex", flexDirection: "row"}}>

				<input
					type="text"
					value={
						color[0] === "#"?
						`${color}`
						:
						`#${color}`
					}
					onChange={(e) => {setColor(e.target.value)}}
					placeholder="#"
					style={{
						width: "70px",
						height: "20px",
					}}
				/>
				<button
					onClick={(e) => setShowColorPicker(!showColorPicker)}
					style={{
						height: "25px",
						minWidth: "25px",
						marginLeft: "2px",
						backgroundColor: color,
						border: "solid 1px #ddd",
						cursor: "pointer",
					}}
				>
				</button>
				{
					showColorPicker
					&&
					<ColorPicker
						setColor={setColor}
						// initColor={color}
						color={color}
						position={{
							left: "100px",
							top: "400px",
						}}
					/>
				}
			</div>
		</div>
	)
}

const BackgroundColorInput = () => {
	const {
		outerStyle,
		setOuterStyle,
		currentSelectedId,
		updateComponent,
	} = useContext(Context);
	return (
		<div>
			<ColorInput
				name="Background Color"
				value={outerStyle["background-color"]}
				onChange={(v) => {
					const currOuterStyle = outerStyle;
					setOuterStyle({...currOuterStyle, "background-color": `${v}`})
					if (currentSelectedId) {
						updateComponent(currentSelectedId, {"outerStyle": {
							...currOuterStyle, "background-color": `${v}`,
						}});
					}
				}}/>
		</div>
	)
}

const TextContent = () => {
	const {
		content,
		setContent,
	} = useContext(Context);
	return (
		<div>
			<p>Text Content</p>
			<textarea
				value={content.text}
				onChange={(e) => setContent({
					...content,
					"text": e.target.value,
				})}
			/>
		</div>
	)
}

const OuterStyleInput = () => {
	return (
		<div>
			<OuterStylePositionInput/>
			<BackgroundColorInput/>
		</div>
	)
}

const ControlPanel = () => {
	const {
		createComponent,
		createHtml,
		setType,
		currentPoint,
		currentSelectedId,
		deleteComponent,
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
					setType("Text");
				}}
			>
				Text
			</button>
			<button
				onClick={() => {
					setType("Text");
				}}
			>
				Image
			</button>
			
			<button
				onClick={() => {
					writeToFile();
				}}
			>
				writeToFile
			</button>
			<button
				onClick={() => {
					createHtml();
				}}
			>
				HTML
			</button>
			<OuterStyleInput/>

			<TextContent/>

			<button
				onClick={() => {
					createComponent();
				}}
			>
				Create!
			</button>
			<button
				onClick={() => {
					if (currentSelectedId !== 'bg') {
						deleteComponent(currentSelectedId);
					}
				}}
			>
				Delete!
			</button>

			<div>
				<p>X: {currentPoint.x}</p>
				<p>Y: {currentPoint.y}</p>
			</div>

		</div>
	)
}

export default ControlPanel;