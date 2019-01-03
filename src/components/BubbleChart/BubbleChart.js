import React, { Component } from "react";
import * as d3 from "d3";

//setting up global values for svg height and width
const margin = { left: 20, top: 20, right: 20, bottom: 20 };
const height = 600 - margin.top - margin.bottom;
const width = 800 - margin.left - margin.right;

//setup the simulation for the bubbles to explode from the center on data change
const simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("charge", d3.forceManyBody().strength(180));

class BubbleChart extends Component {
  state = {
    circles: [],
    rScale: d3.scaleLinear().range([30, 125]),
    cScale: d3.scaleOrdinal(d3.schemePaired)
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("getDerivedStateFromProps", nextProps,prevState);
    if (!nextProps) return null;
    const { data } = nextProps;
    const { rScale, cScale } = prevState;

    //filter top 10
    let sortedData = data.sort((a, b) => {
      return b.summary.TW - a.summary.TW;
    });

    const top15 = sortedData.slice(0, 15);
    //Update scales with new data
    rScale.domain(d3.extent(top15, d => d.summary.TW));
    cScale.domain(top15, d => d.metadata.asset_name);

    //create data for circles
    const circles = top15.map(data => {
      return { name: data.metadata.asset_name, value: data.summary.TW };
    });

    return { circles };
  }

  componentDidMount() {
    simulation
      .force(
        "collision",
        d3.forceCollide().radius(d => this.state.rScale(d.value))
      )
      .on("tick", this.forceTick);
    this.renderCircles();
    simulation
      .nodes(this.state.circles)
      .alpha(0.9)
      .restart();
  }

  componentDidUpdate() {
    //console.log("bubbleChart: componentDidUpdate");
    //console.log(this.state.circles);

    simulation
      .force(
        "collision",
        d3.forceCollide().radius(d => this.state.rScale(d.value))
      )
      .on("tick", this.forceTick);

    this.renderCircles();

    simulation
      .nodes(this.state.circles)
      .alpha(0.9)
      .restart();
  }

  renderCircles() {
    //console.log("renderCircles", this.state.circles);

    //JOIN
    this.node = d3
      .select(this.refs.svgContainer)
      .selectAll("g")
      .data(this.state.circles);

    //EXIT
    this.node.exit().remove();

    //ENTER
    this.nodeEnter = this.node.enter().append("g");
    this.circles = this.nodeEnter.append("circle");
    this.label = this.nodeEnter.append("text");

    //ENTER + UPDATE
    this.node = this.nodeEnter.merge(this.node);
    this.node
      .select("circle")
      .attr("r", d => this.state.rScale(d.value))
      .attr("fill", d => this.state.cScale(d.name));
    this.node
      .select("text")
      .attr("text-anchor", "middle")
      .attr("font-size", d => this.state.rScale(d.value) / 4)
      .attr("fill", "black")
      .attr("font-family", "'Pragati Narrow', sans-serif")
      .text(d => {
        //this is some cutting edge stuff..
        //i didn't want to spend too much time messing with text size to fit bubbles.
        //will refactor this when i have more time.
        if (d.name.length > 17 && this.state.rScale(d.value) / 3 > 17)
          return d.name.substring(0, 17);
        return d.name.substring(0, this.state.rScale(d.value) / 3);
      });
  }

  //update positioning of group every tick.
  forceTick = () => {
    this.node.attr("transform", d => `translate(${d.x}, ${d.y})`);
  };

  render() {
    return <svg ref="svgContainer" width={width} height={height} />;
  }
}

export default BubbleChart;
