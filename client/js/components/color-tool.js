import React from "react";
import Header from './tool-header'


export class ColorTool extends React.Component {
	state = { colorName: "", hexCode: "#666666" };
	render() {
		return (
			<div>
        <Header header={"Color Tool"}></Header >
				<ul>
					{this.props.colors.map((c, i) => (
						<li key={i} style={{ color: c.hexCode }}>
							{c.name} : {c.hexCode}
						</li>
					))}
				</ul>
				<form>
					<label>New Color:</label>
					<br/>
          <input
						onChange={e => {
							this.setState({ colorName: e.target.value });
						}}
						value={this.state.colorName}
					/>
          <br/>
					<input
            type="color"
						onChange={e => {
							this.setState({ hexCode: e.target.value });
						}}
						value={this.state.hexCode}
					/>
          <br/>
					<button
						onClick={e => {
							e.preventDefault();
							this.props.onAdd({
								name: this.state.colorName,
								hexCode: this.state.hexCode
							});
						}}
					>
						submit
					</button>
				</form>
			</div>
		);
	}
}
