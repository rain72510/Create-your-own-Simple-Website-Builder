import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TextField from '@mui/material/TextField';

import ColorPicker from "./ColorPicker";

import "./ControlPanel.css";
import "./ImgSearch.css";

const ACCESS_KEY="9ZM61M-0xPrLVshNpTEQpvm2ekEgqkP1avxAsD3xCTA";

let TOP = 0;
let LEFT = 0;

const NumberInput = (props) => {
	return (
		<div>
			<p style={{paddingLeft: "3px", width: "auto", fontSize: "18px", color: "rgb(43, 62, 99)"}}>{props.name}</p>
			<TextField
				type="number"
				value={props.value}
				size={"small"}
				onChange={(e) => {props.onChange(e.target.value)}}
				style={{
					backgroundColor: "white",
					width: "80px",
					height: "auto",
					position: "static",
					marginRight: "10px"
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

	//console.log("color in ColorInput: ", color);
	return (
		<div style={{ marginTop: "15px"}}>
			<p style={{paddingLeft: "3px", width: "auto", fontSize: "18px", color: "rgb(43, 62, 99)"}}>{props.name}</p>
			<div style={{display: "flex", flexDirection: "row"}}>
				<TextField
					size={"small"}
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
						backgroundColor: "white",
						width: "150px",
						height: "auto",
						position: "static",
						marginRight: "10px"
					}}
				/>
				<Button variant = "contained"
					onClick={(e) => {setShowColorPicker(!showColorPicker) ;TOP=e.clientY;LEFT=e.clientX}}
					style={{
						height: "25px",
						minWidth: "25px",
						marginLeft: "2px",
						backgroundColor: color,
						border: "solid 1px #ddd",
						cursor: "pointer",
					}}
				>
				</Button>
				{
					showColorPicker
					&&
					<ColorPicker
						setColor={setColor}
						// initColor={color}
						color={color}
						position={{
							left: LEFT + 10 + "px",
							top: TOP - 40 + "px",
						}}
					/>
				}
			</div>
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
		<div className="OuterStylePositionInput" style={{columnGap:"50px"}}>
			<NumberInput name="Width" value={parseFloat(outerStyle.width)} size="small" onChange={(v) => {
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
					setOuterStyle({...currOuterStyle, "background-color": `${v}`});
					if (currentSelectedId) {
						updateComponent(currentSelectedId, {"outerStyle": {
							...currOuterStyle, "background-color": `${v}`,
						}});
					}
				}}/>
		</div>
	)
}

const TextFontSize = () => {
	const {
		innerStyle,
		setInnerStyle,
		updateComponent,
		currentSelectedId,
	} = useContext(Context);
	
	return (
		<div>
			<NumberInput name="Font Size" value={parseFloat(innerStyle["font-size"])} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, "font-size": `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, "font-size": `${v}px`,
					}});
				}
			}}/>
		</div>
	)
}

const TextColorInput = () => {
	const {
		innerStyle,
		setInnerStyle,
		currentSelectedId,
		updateComponent,
	} = useContext(Context);
	
	//console.log('innerStyle in TextColorInput: ', innerStyle);
	//console.log('innerStyle.color in TextColorInput: ', innerStyle.color);
	return (
		<div>
			<ColorInput
				name="Text Color"
				value={innerStyle.color}
				onChange={(v) => {
					const currInnerStyle = innerStyle;
					setInnerStyle({...currInnerStyle, "color": `${v}`})
					if (currentSelectedId) {
						updateComponent(currentSelectedId, {"innerStyle": {
							...currInnerStyle, "color": `${v}`,
						}});
					}
				}}/>
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

const InnerStylePositionInput = () => {
	const {
		innerStyle,
		setInnerStyle,
		currentSelectedId,
		updateComponent,
	} = useContext(Context);
	return (
		<div className="InnerStylePositionInput" style={{display: "flex", flexDirection: "row", gap: "50px"}}>
			<NumberInput name="MarginLeft" value={parseFloat(innerStyle["margin-left"])} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, "margin-left": `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, "margin-left": `${v}px`,
					}});
				}
			}}/>
			<NumberInput name="MarginTop" value={parseFloat(innerStyle["margin-top"])} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, "margin-top": `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, "margin-top": `${v}px`,
					}});
				}
			}}/>

		</div>
	)
}

const InnerStyleInput = () => {
	return (
		<div>
			<InnerStylePositionInput/>
		</div>
	)
}

const TextContent = () => {
	const {
		textContent,
		setTextContent,
		currentSelectedId,
		updateComponent
	} = useContext(Context);
	return (
		<div>
			<p style={{paddingLeft: "3px", width: "auto", fontSize: "18px", color: "rgb(43, 62, 99)"}}>Text Content</p>
			<textarea
				value={textContent.text}
				style={{
					backgroundColor: "white",
					width: "150px",
					height: "100px",
					position: "static",
					marginRight: "10px"
				}}
				onChange={(e) => {
					setTextContent({
						...textContent,
						"text": e.target.value,
					});
					if (currentSelectedId) {
						updateComponent(currentSelectedId, {"content":
							{
								"text": e.target.value,
							}
						});
					}
					// console.log(e.target.value)
				}}
			/>
		</div>
	)
}

const TextPanel = () => {
	return (
		<div>
			<TextFontSize/>
			<TextContent/>
			<TextColorInput/>
		</div>
	)
}

const ImgSearch = (props) => {
	const [textInput, setTextInput] = useState((localStorage.getItem("cartItemName") || ''));
	const [images, setImages] = useState((JSON.parse(localStorage.getItem("imgList")) || []));
	const [imgList, setImgList] = useState([]);
	const [numberPage, setNumberPage] = useState(0);

	const {
		innerStyle
	} = useContext(Context);

	const sendQuery = (e) => {
		fetch(`https://api.unsplash.com/search/photos?query=${textInput}&page=${numberPage + 1}`, {
			headers: {
				Authorization: `Client-ID ${ACCESS_KEY}`,
			}
		})
		.then(res => {
			return res.json();

		})
		.then(data => {
			// console.log(numberPage)
			if (numberPage > 0) {
				// console.log('images.results', images.results)
				const curImagesResults = images.results.concat(data.results);
				setImages({...images, "results": curImagesResults});
				// console.log('length', curImagesResults.length)
			}
			else {
				setImages(data);
			}

		})
		.catch(error => {
			// Handle any errors that occurred during the request
			console.log('Error:', error);
		});
		localStorage.setItem("cartItemName", textInput);
		// setImages(testImages);
	}

	const bestWidthHeight = (width, height, maxWidth, maxHeight) => {
		const bestHeight = height * (maxWidth / width);
		const bestWidth = width * (maxHeight / height);
		if (bestHeight > maxHeight) return [bestWidth, maxHeight];
		else return [maxWidth, bestHeight];
	}

	useEffect(() =>{
		// console.log(images);
		setImgList((images.results || []).map((imgItem, k) => {
			return (
				<img
					className='searchResultImg'
					key={k}
					src={imgItem.urls.thumb}
					alt={imgItem.description}
					onClick={() => {
						const [bestWidth, bestHeight] = bestWidthHeight(
							imgItem.width,
							imgItem.height,
							parseFloat(innerStyle.width),
							parseFloat(innerStyle.height),
						)
						if (!(bestWidth && bestHeight)) [bestWidth, bestHeight] = ["200px", "100px"]
						// console.log("bestWidth:", bestWidth)
						props.setCurrentImgProp({
							src: imgItem.urls.thumb,
							alt: imgItem.description,
							width: bestWidth,
							height: bestHeight,
						})
					}}
				/>
			)
		}));
		localStorage.setItem("imgList", JSON.stringify(images));
	}, [images]);

	return (
		<div style={{zIndex: 10, alignContent: "center", height: "300px"}}>
			<div className="flexbox" style={{padding: "5px"}}>
				<input 
					className='textSearch'
					value={textInput}
					onChange={(e) => {
						setTextInput(e.target.value)
					}}
					placeholder='Search for pictures.'
					/>
			</div>
			<div className="flexbox" style={{padding: "5px"}}>
				<button
					className='textSearchButton'
					onClick={(e) => {
						sendQuery(e);
						setNumberPage(1);
					}}
					>
					Search
				</button>
			</div>
			{imgList.length === 0? 
				<p>No Results</p>
				:
				<div className='searchResult flexbox' style={{alignItems: "stretch"}}>
					<div style={{alignItems: "stretch"}}>
						{imgList}
					</div>
					<div>
						<Button
							sx={{
								position:"static",
								marginLeft:"10px"
							}}
							className='textSearchButton'
							onClick={(e) => {
								sendQuery(e);
								setNumberPage(numberPage + 1);
							}}
						>
							Display More
						</Button>
					</div>
				</div>
			}
		</div>
	)
}

const ImgSizeInput = () => {
	const {
		innerStyle,
		setInnerStyle,
		updateComponent,
		currentSelectedId,
	} = useContext(Context);
	return (
		<div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
			<NumberInput name="Image Width" value={parseFloat(innerStyle.width)} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, width: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, width: `${v}px`,
					}});
				}
			}}/>
			<NumberInput name="Image Height" value={parseFloat(innerStyle.height)} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, height: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, height: `${v}px`,
					}});
				}
			}}/>
		</div>
	)
}

const ImgPanel = () => {
	const {
		imgContent,
		setImgContent,
		innerStyle,
		setInnerStyle,
		outerStyle,
		setOuterStyle,
	} = useContext(Context)
	const [showSearchOnUnsplash, setShowSearchOnUnsplash] = useState(false);
	const [currentImgProp, setCurrentImgProp] = useState({
		src: undefined,
		alt: undefined,
		width: undefined,
		height: undefined,
	});

	const [currentImg, setCurrentImg] = useState(null)

	useEffect(() => {
		setCurrentImg(
			<img src={currentImgProp.src} alt={currentImgProp.alt} style={{maxWidth: "200px", maxHeight: "100px"}} draggable="false"/>
		)
		setImgContent({
			...imgContent,
			"src": currentImgProp.src,
			"alt": currentImgProp.alt,
			"user-drag": "none",
			"draggable": false,
		});
		if (currentImgProp.width && currentImgProp.height) {
			// console.log("Setting inner")
			setInnerStyle({
				...innerStyle,
				width: `${currentImgProp.width}px`,
				height: `${currentImgProp.height}px`,
			})
			setOuterStyle({
				...outerStyle,
				width: `${currentImgProp.width}px`,
				height: `${currentImgProp.height}px`,
			})
		}
	}, [currentImgProp])

	return (
		<div>
			<ImgSizeInput/>
			<Button
				sx = {{backgroundColor : "#53acff", marginTop : "10px", color: "rgb(43, 62, 99)", marginBottom: "5px", ":hover": {
				bgcolor: "rgb(43, 62, 99)",
				color: "white",
					marginBottom: "5px",
					position: "static"
				}}}
				variant="outlined"
				onClick={(e) => {
					setShowSearchOnUnsplash(!showSearchOnUnsplash);
				}}
			>
				Search On Unsplash!
			</Button>
			{
				showSearchOnUnsplash
				&&
				<div
					style={{
						width: "280px",
						height: "300px",
						overflowY: "scroll",
					}}
				>
					<ImgSearch setCurrentImgProp={setCurrentImgProp}/>
				</div>
			}
			<div>
				<p style={{paddingLeft: "3px", width: "auto", fontSize: "18px", color: "rgb(43, 62, 99)"}}>current image: </p>
				{currentImg}
			</div>
		</div>
	)
}

const ControlPanel = () => {
	const {
		createComponent,
		createHtml,
		type,
		setType,
		// setCurrentSelectedId,
		currentPoint,
		previousPoint,
		delta,
		currentSelectedId,
		deleteComponent,
		HTMLText,
		htmlFileCount,
		setHtmlFileCount,
	} = useContext(Context);

	const writeToFile = () => {
		fetch("http://localhost:8080/api/generateHtml", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: htmlFileCount,
				HTMLText: HTMLText,
			})
		})
		.then((res) => {
			if (res.ok) {
				console.log('Success');
				setHtmlFileCount(htmlFileCount + 1);
			} else {
				console.error('Receive error')
			}
		})
		.catch((err) => {
			console.error(err);
		});
	}

	const [customPanel, setCustomPanel] = useState(<TextPanel/>);

	useEffect(() => {
		switch (type) {
			case "Text":
				setCustomPanel(<TextPanel/>);
				break;
			case "Img":
				setCustomPanel(<ImgPanel/>);
				break;
		}
		// setCurrentSelectedId(null);
	}, [type])

	return (
		<div className="ControlPanel">
			<ButtonGroup variant="contained" sx = {{ borderColor : 'rgb(43, 62, 99)', "z-index" : "relative" }}>
				<Button
					sx = {{backgroundColor : 'rgb(43, 62, 99)',}}
					onClick={() => {
						setType("Text");
					}}
					startIcon={<TextFieldsIcon />}
				>Text</Button>

				<Button
					sx = {{backgroundColor : 'rgb(43, 62, 99)'}}
					onClick={() => {
						setType("Img");
					}}
					startIcon={<ImageIcon />}
				>Image</Button>
			</ButtonGroup>

			<ButtonGroup variant="contained" sx={{marginTop : "10px"}}>
				<Button
					sx = {{backgroundColor : "#53acff", ":hover": {
						bgcolor: "#a3d3ff",
						color: "white"
					  }}}
					onClick={() => {
						createHtml();
					}}
					startIcon={<FileUploadIcon />}
				>
					HTML
				</Button>

				<Button
					sx = {{backgroundColor : "#53acff", ":hover": {
						bgcolor: "#a3d3ff",
						color: "white"
					  }}}
					onClick={() => {
						writeToFile();
					}}
					>Preview</Button>
				</ButtonGroup>
			<OuterStyleInput/>
			<InnerStyleInput/>
			{customPanel}
			<ButtonGroup >
			<Button
				variant = "contained"
				onClick={() => {
					createComponent();
				}}
				sx = {{backgroundColor: "rgb(43, 62, 99)", marginTop : "10px"}}
			>
				Create
			</Button>
			<Button
				variant = "contained"
				onClick={() => {
					if (currentSelectedId !== 'bg') {
						deleteComponent(currentSelectedId);
					}
				}}
				sx = {{backgroundColor : '#ac0000', marginTop : "10px", ":hover": {
					bgcolor: "#d30000",
					color: "white"
					}}}
			>
				Delete
			</Button>
			</ButtonGroup>

			<div className="showCoordinate flexbox" style={{position: "static", gap: "20px", width: "300px", justifyContent: "start"}}>
				<div style={{display: "flex", flexDirection: "column"}}>
					<p style={{margin: "0", color: "rgb(43, 62, 99)"}}> current:</p>
					<p style={{margin: "0", color: "rgb(43, 62, 99)"}}> ({currentPoint.x}, {currentPoint.y})</p>
				</div>
				<div style={{display: "flex", flexDirection: "column"}}>
					<p style={{margin: "0", color: "rgb(43, 62, 99)"}}> previous:</p>
					<p style={{margin: "0", color: "rgb(43, 62, 99)"}}> ({previousPoint.x}, {previousPoint.y})</p>
				</div>
				<div style={{display: "flex", flexDirection: "column"}}>
					<p style={{margin: "0", color: "rgb(43, 62, 99)"}}> distance:</p>
					<p style={{margin: "0", color: "rgb(43, 62, 99)"}}> ({delta.x}, {delta.y})</p>
				</div>
				{/* <p>previous: ({previousPoint.x}, {previousPoint.y})</p>
				<p>distance: ({delta.x}, {delta.y})</p> */}
			</div>
		</div>
	)
}

export default ControlPanel;