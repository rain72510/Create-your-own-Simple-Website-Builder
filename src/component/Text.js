import Component from "./Component";

class Text extends Component {
	constructor(props) {
		super(props);
		this.text = `aasa`;
	}

	render() {
		return (
			<div style={this.style}>
				<p>
					{this.text}
				</p>
			</div>
		)
	}
}

export default Text;