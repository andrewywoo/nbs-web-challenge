import React, { Component } from "react";
import * as d3 from "d3";

//setting up global values for svg height and width
const margin = { left: 50, top: 20, right: 20, bottom: 50 };
const height = 500 - margin.top - margin.bottom;
const width = 700 - margin.left - margin.right;

class BubbleChart extends Component {
  state = {
    circles: [{}, {}, {}, {}, {}]
  };

  simulation = d3
    .forceSimulation(this.state.circles)
    .force("center", d3.forceCenter(100, 100))
    .force("collision", d3.forceCollide().radius(d => d.radius));
  //.on("tick", this.renderCircle);

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState };
  }

  componentDidUpdate() {
    this.renderCircle();
  }

  renderCircle() {
    let svg = d3.select(this.refs.svgContainer);
    let circles = svg.selectAll("circle").data(this.state.circles);

    circles
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 10)
      .attr("fill", "red");
  }

  render() {
    return <svg ref="svgContainer" width={width} height={height} />;
  }
}

export default BubbleChart;
