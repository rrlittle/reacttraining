import React from "react";
import ReactDom from "react-dom";
import { ColorTool } from "./components/color-tool";
import { CarTool } from "./components/car-tool";
class App extends React.Component {
  state = {
    colors: [
      { name: "red", hexCode: "#ff0000" },
      { name: "black", hexCode: "#000000" },
      { name: "blue", hexCode: "#0000ff" }
    ],
    cars: [
      {
        id: 1,
        make: "toyota",
        model: "prius",
        year: "2005",
        color: "silver",
        price: "too much"
      },
      {
        id: 2,
        make: "chevy",
        model: "cobalt",
        year: "2008",
        color: "yellow",
        price: "pretty good"
      }
    ]
  };
  updateCar(i, carState) {
    let cars = this.state.cars;
    cars.splice(i, 1, carState);
    this.setState(cars);
  }
  deleteCar(i) {
    let cars = this.state.cars;
    cars.splice(i, 1);
    this.setState({ cars: cars });
  }
  handleColorAdd(c) {
    this.setState({ colors: this.state.colors.concat(c) });
  }
  handleCarAdd(c) {
    c["id"] = this.state.cars.reduce((sum, next) => sum + next.id, 1);
    this.setState({ cars: this.state.cars.concat(c) });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <ColorTool
            colors={this.state.colors}
            onAdd={this.handleColorAdd.bind(this)}
          />
        </div>
        <div className="container-fluid">
          <CarTool
            headers={[
              ["make", "text"],
              ["model", "text"],
              ["year", "text"],
              ["color", "color"],
              ["price", "number"]
            ]}
            deleteRow={this.deleteCar.bind(this)}
            data={this.state.cars}
            onAdd={this.handleCarAdd.bind(this)}
            updateItem={this.updateCar.bind(this)}
          />
        </div>
      </div>
    );
  }
}

ReactDom.render(React.createElement(App), document.querySelector("main"));
