import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";

import Text from "../../component/Text";
import Img from "../../component/Img";
// import WorkspaceGridContainer from "./WorkspaceGridContainer";

import "./Workspace.css";

const workspaceX = 310;
const workspaceY = 10;

const ComponentItem = (props) => {
	const {
		currentSelectedId,
	} = useContext(Context);

	var outerStyle = (currentSelectedId == props.id?
		{...props.outerStyle, "box-shadow": "5px 5px",}:
		props.outerStyle
	)

	return (
		<div
			style={outerStyle}
			id={props.id}
		>
			<props.type content={props.content} innerStyle={props.innerStyle} id={props.id}/>
		</div>
	)
}

const Workspace = () => {
	const {
		components,
		currentSelectedId,
		outerStyle,
		setOuterStyle,
		setCurrentSelectedId,
		updateComponent,
		getComponentFromId,
		setCurrentPoint,
		setPreviousPoint,
	} = useContext(Context);

	const [mouseDownPoint, setMouseDownPoint] = useState({
    x: undefined,
    y: undefined,
  });

	const [initPoint, setInitPoint] = useState({
    x: undefined,
    y: undefined,
  })

  const [dragging, setDragging] = useState(false);

	const handleMouseDown = (e, id) => {
		setPreviousPoint({
			x: e.nativeEvent.clientX - workspaceX,
			y: e.nativeEvent.clientY - workspaceY,
		})
		setCurrentSelectedId(id);
		setDragging(true);
		setMouseDownPoint({
			x: e.nativeEvent.clientX - workspaceX,
			y: e.nativeEvent.clientY - workspaceY,
		});
		const component = getComponentFromId(id);
		if (id === 'bg') {
			setOuterStyle({
				...outerStyle,
				left: `${e.nativeEvent.clientX - workspaceX}px`,
				top: `${e.nativeEvent.clientY - workspaceY}px`,
			})
		}
		if (component){
			setInitPoint({
				x: component.outerStyle.left,
				y: component.outerStyle.top,
			})
		}
	}

	const handleMouseMove = (e) => {
		setCurrentPoint({
			x: e.nativeEvent.clientX - workspaceX,
			y: e.nativeEvent.clientY - workspaceY,
		});
		if (dragging) {
			if (currentSelectedId !== 'bg') {
				const currOuterStyle = outerStyle;
				const component = getComponentFromId(currentSelectedId);
				const componentOuterStyle = component.outerStyle;
				// console.log("e.nativeEvent.offset: ", e.nativeEvent.offsetX, e.nativeEvent.offsetY);
				// console.log("mouseDownPoint: ", mouseDownPoint.x, mouseDownPoint.y);
				const deltaX = e.nativeEvent.clientX - workspaceX - mouseDownPoint.x;
				const deltaY = e.nativeEvent.clientY - workspaceY - mouseDownPoint.y;
				// console.log("deltaX: ", deltaX, "parseFloat(currOuterStyle.left): ", parseFloat(currOuterStyle.left))
				setOuterStyle({
					...currOuterStyle,
					left: `${deltaX + parseFloat(initPoint.x)}px`,
					top: `${deltaY + parseFloat(initPoint.y)}px`,
				})
				updateComponent(currentSelectedId, {"outerStyle": {
					...componentOuterStyle,
					left: `${deltaX + parseFloat(initPoint.x)}px`,
					top: `${deltaY + parseFloat(initPoint.y)}px`,
				}})
			}
		}
	}

	const handleMouseUp = (e) => {
		setDragging(false);
	}

	const componentsJSXList = components.map((v, i) => {
		var type = Text;
		switch (v.type) {
			case "Text":
				type = Text;
				break;
			case "Img":
				type = Img;
				break;
		}
		return (
			<ComponentItem
				type={type}
				content={v.content}
				innerStyle={v.innerStyle}
				outerStyle={v.outerStyle}
				id={v.id}
				handleMouseDown={handleMouseDown}
			/>
		)
	})
	return (
		<div id={"bg"} className="Workspace"
			onMouseDown={e => {
				// console.log("In bg");
				handleMouseDown(e, e.target.id);
				// console.log('e.target.id: ', e.target.id);
			}}
			onMouseMove={e => {handleMouseMove(e)}}
			onMouseUp={e => {handleMouseUp(e)}}
		>

			{componentsJSXList}
		</div>
	)
}

export default Workspace;
