import Component from "./Component";

class Text extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<div>
				<p>
					{this.props.content.text}
				</p>
			</div>
		)
	}
}

export default Text;