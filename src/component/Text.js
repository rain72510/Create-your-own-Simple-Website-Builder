import Component from "./Component";

class Text extends Component {
	constructor(props) {
		super(props);
		// console.log("Text", props);
	}

	render() {
		return (
			<p style={this.props.innerStyle} id={this.props.id} onClick={() => {
				// console.log(this.props.innerStyle)
			}}>
				{this.props.content.text}
			</p>
		)
	}
}

export default Text;