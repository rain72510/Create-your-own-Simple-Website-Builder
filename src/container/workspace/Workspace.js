import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";

import Text from "../../component/Text";
// import WorkspaceGridContainer from "./WorkspaceGridContainer";

import "./Workspace.css";


const ComponentItem = (props) => {
	const {
		currentSelectedId,
	} = useContext(Context);

	var outerStyle = (currentSelectedId == props.id?
		{...props.outerStyle, "box-shadow": "5px 5px",}:
		props.outerStyle
	)

	return (
		<div style={outerStyle} onMouseDown={(e) => {
			props.handleMouseDown(e, props.id);
			e.stopPropagation();
		}}>
			<props.type content={props.content} innerStyle={props.innerStyle}/>
		</div>
	)
}

const Workspace = (props) => {
	const {
		components,
		setCurrentSelectedId,
	} = useContext(Context);

	const [mouseDownPoint, setMouseDownPoint] = useState({
    x: undefined,
    y: undefined,
  });
  const [dragging, setDragging] = useState(false);

	const handleMouseDown = (e, id) => {
		// console.log(e.nativeEvent.clientX, e.nativeEvent.clientY);
		console.log(e);
		setCurrentSelectedId(id);
	}

	const handleMouseMove = (e) => {
		if (dragging) {
			console.log(e);
		}
	}

	const componentsJSXList = components.map((v, i) => {
		var type = Text;
		switch (v.type) {
			case "Text":
				type = Text;
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
		<div id={"bg"} className="Workspace" onMouseDown={e => {console.log("In bg");handleMouseDown(e);}}>

			{componentsJSXList}
		</div>
	)
}

export default Workspace;
