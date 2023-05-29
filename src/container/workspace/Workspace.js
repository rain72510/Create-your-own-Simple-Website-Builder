import React, { useContext } from "react";
import Context from "../../context/Context";

import Text from "../../component/Text";
// import WorkspaceGridContainer from "./WorkspaceGridContainer";

import "./Workspace.css"


const WorkspaceGridItem = (props) => {

	const Item = props.item;

	return (
		<div style={{
			gridColumn: "3 / 6",
			gridRow: "5 / 12",
			zIndex: "1",
			background: "yellow",
			padding: "20px",
			margin: "60px"
		}}>
			<Item></Item>
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
			console.log({ic: ic, ir: ir});
			return <WorkspaceGridBasic column={ic+1} row={ir+1} key={{ic: ic, ir: ir}}/>;
		});
	})

	return (
		<div className="WorkspaceGridContainer">
			{WorkspaceGridBasicColumn}
			<WorkspaceGridItem item={Text}/>
		</div>
	)
}

const Workspace = (props) => {
	const {
		currMode,
		setCurrMode,
	} = useContext(Context);

	const Items = props.item;

	

	return (
		<div className="Workspace">
			<WorkspaceGridContainer/>
		</div>
	)
}

export default Workspace;