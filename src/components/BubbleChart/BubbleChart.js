import React, { Component } from "react";
import * as d3 from "d3";

//setting up global values for svg height and width
const margin = { left: 50, top: 20, right: 20, bottom: 50 };
const height = 500 - margin.top - margin.bottom;
const width = 700 - margin.left - margin.right;

const simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("charge", d3.forceManyBody().strength(180))
  .force("collision", d3.forceCollide().radius(d => d.radius));

class BubbleChart extends Component {
  state = {
    circles: [],
    cScale: d3.scaleSequential(d3.interpolateSpectral).domain([100, 20])
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps);
    // return null;
    if (!nextProps) return null;

    const { data } = nextProps;

    return { circles: data };
  }

  componentDidUpdate() {
    console.log("bubbleChart: componentDidUpdate");
    console.log(this.state.circles);

    simulation.on("tick", this.forceTick);

    this.renderCircles();

    simulation
      .nodes(this.state.circles)
      .alpha(0.9)
      .restart();
  }

  renderCircles() {
    //console.log("renderCircles", this.state.circles);
    this.circles = d3
      .select(this.refs.svgContainer)
      .selectAll("circle")
      .data(this.state.circles);

    //exit cycle
    this.circles.exit().remove();

    //update cycle
    // this.circles
    //   .attr("r", d => d.radius)
    //   .attr("fill", d => this.state.cScale(d.radius));

    //enter + update cycle
    this.circles = this.circles
      .enter()
      .append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => this.state.cScale(d.radius))
      .merge(this.circles)
      .attr("r", d => d.radius)
      .attr("fill", d => this.state.cScale(d.radius));
  }

  forceTick = () => {
    this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
  };

  render() {
    console.log(this.state.circles);
    return <svg ref="svgContainer" width={width} height={height} />;
  }
}

export default BubbleChart;
