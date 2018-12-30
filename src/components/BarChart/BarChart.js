import React, { Component } from "react";
import * as d3 from "d3";

//setting up global values for svg height and width
const margin = { left: 50, top: 20, right: 20, bottom: 50 };
const height = 500 - margin.top - margin.bottom;
const width = 700 - margin.left - margin.right;

class BarChart extends Component {
  state = {
    bars: [],
    xScale: d3.scaleTime().range([0, width]),
    yScale: d3.scaleLinear().range([height, 0]),
    wScale: d3
      .scaleBand()
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0)
  };

  //setting up axis and tick formats
  xAxis = d3.axisBottom(this.state.xScale).tickFormat(d3.timeFormat("%b-%Y"));
  yAxis = d3.axisLeft(this.state.yScale);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps) return null;

    const { data } = nextProps;
    const { xScale, yScale, wScale } = prevState;

    //recalculate scales with new data
    xScale.domain(d3.extent(data, d => d.date));
    yScale.domain([0, d3.max(data, d => d.value)]);
    wScale.domain(data.map(d => d.date));

    //create rect x and y values.
    const bars = data.map(d => {
      return {
        x: xScale(d.date),
        y: yScale(d.value),
        height: height - yScale(d.value)
      };
    });

    return { bars };
  }

  //update axis when component updates
  componentDidUpdate() {
    d3.select(this.refs.xAxis)
      .transition()
      .duration(800)
      .call(this.xAxis);
    d3.select(this.refs.yAxis)
      .transition()
      .duration(800)
      .call(this.yAxis);
  }

  render() {
    return (
      <svg
        height={height + margin.top + margin.bottom}
        width={width + margin.left + margin.right}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {this.state.bars.map((d, i) => {
            return (
              <rect
                key={i}
                x={d.x}
                y={d.y}
                height={d.height}
                width={this.state.wScale.bandwidth()}
              />
            );
          })}
          <g ref="xAxis" transform={`translate(0, ${height})`} />
          <g ref="yAxis" />
        </g>
      </svg>
    );
  }
}

export default BarChart;
