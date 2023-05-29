import React from "react";
import "./WorkspaceGridContainer.css";


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
		const WorkspaceGridBasicRow = Array(16).fill().map((_, ir) => {
			return <WorkspaceGridBasic column={ic+1} row={ir+1}/>;
		})
		return WorkspaceGridBasicRow;
	})

	return (
		<div className="WorkspaceGridContainer">
			{WorkspaceGridBasicColumn}
		</div>
	)
}

export default WorkspaceGridContainer;