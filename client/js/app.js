import React from "react";
import ReactDom from "react-dom";

class ColorTool extends React.Component {
  state = {};
	render() {
		return React.createElement('h1', null, "Color Tool");
	}
}

let node = document.querySelector("main");
let tool = React.createElement(ColorTool);
ReactDom.render(tool, node);
