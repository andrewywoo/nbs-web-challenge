import React, { Component } from "react";
import * as d3 from "d3";
import "./BubbleChart.css";

//setting up global values for svg height and width
const margin = { left: 20, top: 20, right: 20, bottom: 20 };
const height = 600 - margin.top - margin.bottom;
const width = 800 - margin.left - margin.right;

//setup the simulation for the bubbles to explode from the center on data change
const simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("charge", d3.forceManyBody().strength(200));

class BubbleChart extends Component {
  state = {
    circles: [],
    rScale: d3.scaleLinear().range([30, 125]),
    cScale: d3.scaleOrdinal(d3.schemePaired),
    trackDateRange: null,
    trackMetricId: null,
    artistId: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("getDerivedStateFromProps", nextProps,prevState);
    if (!nextProps) return null;
    const { data, trackDateRange, trackMetricId, artistId } = nextProps;
    const { rScale, cScale } = prevState;

    //filter top 15
    let top15 = data
      .sort((a, b) => {
        return b.summary[trackDateRange] - a.summary[trackDateRange];
      })
      .slice(0, 15);

    //Update scales with new data
    rScale.domain(d3.extent(top15, d => d.summary[trackDateRange]));
    cScale.domain(top15, d => d.metadata.asset_name);

    //create data for circles
    const circles = top15.map(data => {
      return {
        name: data.metadata.asset_name,
        value: data.summary[trackDateRange]
      };
    });

    return { circles, trackDateRange, trackMetricId, artistId };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.trackDateRange !== this.state.trackDateRange ||
      nextProps.trackMetricId !== this.state.trackMetricId ||
      nextProps.artistId !== this.state.artistId
    );
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

    let tooltip = d3
      .select(this.refs.container)
      .append("div")
      .style("position", "absolute")
      .style("text-align", "center")
      .style("z-index", "100")
      .style("visibility", "hidden")
      .style("border", "1px solid #fffff4")
      .style("background", "#fffff4")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("font-size", "1.5rem");

    const formatCommas = d3.format(",");

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
    this.label = this.nodeEnter.append("text").attr("id", "label");
    this.val = this.nodeEnter.append("text").attr("id", "val");

    //ENTER + UPDATE
    this.node = this.nodeEnter.merge(this.node);
    this.node
      .select("circle")
      .attr("y", 1)
      .attr("r", d => this.state.rScale(d.value))
      .attr("fill", d => this.state.cScale(d.name))
      .on("mouseover", function(d) {
        // return tooltip.text(d.name).style("visibility", "visible");
        return tooltip
          .html(`<p>${d.name}</p><p>${formatCommas(d.value)}</p>`)
          .style("visibility", "visible");
      })
      .on("mousemove", function(d) {
        return tooltip.style("top", `${d.y}px`).style("left", `${d.x}px`);
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });

    //ENTER + UPDATE
    this.node = this.nodeEnter.merge(this.node);
    this.node
      .select("#label")
      .attr("text-anchor", "middle")
      .attr("font-size", d => this.state.rScale(d.value) / 4)
      .attr("fill", "black")
      .attr("font-family", "'Pragati Narrow', sans-serif")
      .text(d => {
        //saving time instead of focusing on how to get text to wrap.
        if (d.name.length > 17 && this.state.rScale(d.value) / 3 > 17)
          return d.name.substring(0, 17);
        return d.name.substring(0, this.state.rScale(d.value) / 3);
      })
      .on("mouseover", function(d) {
        return tooltip
          .html(`<p>${d.name}</p><p>${formatCommas(d.value)}</p>`)
          .style("visibility", "visible");
      })
      .on("mousemove", function(d) {
        return tooltip.style("top", `${d.y}px`).style("left", `${d.x}px`);
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });

    //ENTER + UPDATE
    this.node = this.nodeEnter.merge(this.node);
    this.node
      .select("#val")
      .attr("text-anchor", "middle")
      .attr("font-size", d => this.state.rScale(d.value) / 4)
      .attr("dy", "1em")
      .attr("fill", "black")
      .attr("font-family", "'Pragati Narrow', sans-serif")
      .text(d => formatCommas(d.value))
      .on("mouseover", function(d) {
        return tooltip
          .html(`<p>${d.name}</p><p>${formatCommas(d.value)}</p>`)
          .style("visibility", "visible");
      })
      .on("mousemove", function(d) {
        return tooltip.style("top", `${d.y}px`).style("left", `${d.x}px`);
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });
  }

  //update positioning of group every tick.
  forceTick = () => {
    this.node.attr("transform", d => `translate(${d.x}, ${d.y})`);
  };

  render() {
    return (
      <div className="BubbleContainer" ref="container">
        <svg ref="svgContainer" width={width} height={height} />
      </div>
    );
  }
}

export default BubbleChart;
