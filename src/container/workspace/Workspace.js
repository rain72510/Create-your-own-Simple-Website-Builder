import React, { useContext } from "react";
import Context from "../../context/Context";

import Text from "../../component/Text";
// import WorkspaceGridContainer from "./WorkspaceGridContainer";

import "./Workspace.css"


const WorkspaceGridComponent = (props) => {

	// const component = props.component;

	return (
		<div style={props.outerStyle}>
			<props.component style={props.innerStyle} content={props.content}></props.component>
		</div>
	)
}

const WorkspaceGridBasic = (props) => {
	const style = {
		borderStyle: "dotted",
		borderWidth: "1px",
		gridColumn: `${props.column} / ${props.column + 1}`,
		gridRow: `${props.row} / ${props.row + 1}`,
		zIndex: "0",
	}
	return (
		<div style={style}>
		</div>
	)
}

const WorkspaceGridContainer = () => {
	const WorkspaceGridBasicColumn = Array(16).fill().map((_, ic) => {
		return Array(16).fill().map((_, ir) => {
			// console.log({ic: ic, ir: ir});
			return <WorkspaceGridBasic column={ic+1} row={ir+1} key={{ic: ic, ir: ir}}/>;
		});
	})

	const {
		components,
	} = useContext(Context);

	const componentsList = components.map((v, i) => {
		return <WorkspaceGridComponent component={v.component} outerStyle={v.outerStyle} innerStyle={v.innerStyle} content={v.content} key={i}/>
	})

	return (
		<div className="WorkspaceGridContainer">
			{WorkspaceGridBasicColumn}
			{componentsList}
		</div>
	)
}

const Workspace = (props) => {
	const {
		currMode,
		setCurrMode,
	} = useContext(Context);
	

	return (
		<div className="Workspace">
			<WorkspaceGridContainer/>
		</div>
	)
}

export default Workspace;