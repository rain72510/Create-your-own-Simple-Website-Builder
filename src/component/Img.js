import Component from "./Component";

class Img extends Component {
	constructor(props) {
		super(props);
		// console.log("Text", props);
	}

	render() {
		return (
			<img
				style={this.props.innerStyle}
				id={this.props.id}
				onClick={() => {
					// console.log(this.props.innerStyle) 
				}}
				draggable="false"
				src={this.props.content.src}
				alt={this.props.content.alt}
			>
			</img>
		)
	}
}

export default Img;