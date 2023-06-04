import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";

import ColorPicker from "./ColorPicker";

import "./ControlPanel.css";
import "./ImgSearch.css";

const ACCESS_KEY="9ZM61M-0xPrLVshNpTEQpvm2ekEgqkP1avxAsD3xCTA";

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

const OuterStylePositionInput = () => {
	const {
		outerStyle,
		setOuterStyle,
		currentSelectedId,
		updateComponent,
	} = useContext(Context);
	return (
		<div className="OuterStylePositionInput">
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

const TextColorInput = () => {
	const {
		innerStyle,
		setInnerStyle,
		currentSelectedId,
		updateComponent,
	} = useContext(Context);
	return (
		<div>
			<ColorInput
				name="Text Color"
				value={innerStyle["color"]}
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
		<div className="InnerStylePositionInput">
			{/* <NumberInput name="InnerWidth" value={parseFloat(innerStyle.width)} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, width: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, width: `${v}px`,
					}});
				}
			}}/>
			<NumberInput name="Height" value={parseFloat(innerStyle.height)} onChange={(v) => {
				const currInnerStyle = innerStyle;
				setInnerStyle({...currInnerStyle, height: `${v}px`})
				if (currentSelectedId) {
					updateComponent(currentSelectedId, {"innerStyle": {
						...currInnerStyle, height: `${v}px`,
					}});
				}
			}}/> */}
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
		content,
		setContent,
		currentSelectedId,
		updateComponent
	} = useContext(Context);
	return (
		<div>
			<p>Text Content</p>
			<textarea
				value={content.text}
				onChange={(e) => {
					setContent({
						...content,
						"text": e.target.value,
					});
					if (currentSelectedId) {
						updateComponent(currentSelectedId, {"content":
							{
								"text": e.target.value,
							}
						});
					}
					console.log(e.target.value)
				}}
			/>
		</div>
	)
}

const TextPanel = () => {
	return (
		<div>
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
			console.log(numberPage)
			if (numberPage > 0) {
				console.log('images.results', images.results)
				const curImagesResults = images.results.concat(data.results);
				setImages({...images, "results": curImagesResults});
				console.log('length', curImagesResults.length)
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

	useEffect(() =>{
		console.log(images);
		setImgList((images.results || []).map((imgItem, k) => {
			return (
				<img
					className='searchResultImg'
					key={k}
					src={imgItem.urls.thumb}
					alt={imgItem.description}
					onClick={() => {
						props.setCurrentImgProp({
							src: imgItem.urls.thumb,
							alt: imgItem.description,
						})
					}}
				/>
			)
		}));
		localStorage.setItem("imgList", JSON.stringify(images));
	}, [images]);

	return (
		<div style={{zIndex: 10}}>
			<div className="flexbox" style={{alignItems: "stretch"}}>
				<input 
					className='textSearch'
					value={textInput}
					onChange={(e) => {
						setTextInput(e.target.value)
					}}
					placeholder='Search for pictures.'
					/>
			</div>
			<div className="flexbox" style={{alignItems: "stretch"}}>
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
				<div className='searchResult flexbox'>
					<div>
						{imgList}
					</div>
					<button
						className='textSearchButton'
						onClick={(e) => {
							sendQuery(e);
							setNumberPage(numberPage + 1);
						}}
					>
						Diplay More
					</button>
				</div>
			}
		</div>
	)
}


const ImgPanel = () => {
	const {
		content,
		setContent,
		currentSelectedId,
		updateComponent,
	} = useContext(Context)
	const [showSearchOnUnsplash, setShowSearchOnUnsplash] = useState(false);
	const [currentImgProp, setCurrentImgProp] = useState({
		src: undefined,
		alt: undefined,
	});

	const [currentImg, setCurrentImg] = useState(null)

	useEffect(() => {
		setCurrentImg(
			<img src={currentImgProp.src} alt={currentImgProp.alt} style={{maxWidth: "200px", maxHeight: "100px"}} draggable="false"/>
		)
		setContent({
			...content,
			"src": currentImgProp.src,
			"alt": currentImgProp.alt,
			"user-drag": "none",
			"draggable": false,
		});
		if (currentSelectedId) {
			updateComponent(currentSelectedId, {"content":
				{
					"src": currentImgProp.src,
					"alt": currentImgProp.alt,
					"user-drag": "none",
					"draggable": false,
				}
			});
		}
	}, [currentImgProp])

	return (
		<div>
			<button
				onClick={(e) => {
					setShowSearchOnUnsplash(!showSearchOnUnsplash);
				}}
			>
				Search On Unsplash!
			</button>
			{
				showSearchOnUnsplash
				&&
				<div
					style={{
						width: "270px",
						height: "200px",
						overflowY: "scroll",
					}}
				>
					<ImgSearch setCurrentImgProp={setCurrentImgProp}/>
				</div>
			}
			<div>
				<p>current image: </p>
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
		console.log("type:", type)
	}, [type])

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
					setType("Img");
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
			<InnerStyleInput/>
			{customPanel}

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

			<div className="showCoordinate">
				<p>X: {currentPoint.x}</p>
				<p>Y: {currentPoint.y}</p>
			</div>
		</div>
	)
}

export default ControlPanel;