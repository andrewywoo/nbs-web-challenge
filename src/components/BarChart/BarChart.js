import React, { Component } from "react";
import * as d3 from "d3";
import "./BarChart.css";

const width = 700;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 50 };

class BarChart extends Component {
  state = {
    bars: [],
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top])
  };

  //generate x and y axis for date and views.
  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .tickFormat(d3.timeFormat("%b-%Y"));
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickFormat(d => {
      return d;
    });

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null;
    const { data } = nextProps;
    const { xScale, yScale } = prevState;

    //recalculate scale with new data
    xScale.domain(d3.extent(data, d => d.date));
    yScale.domain([0, d3.max(data, d => d.value)]);

    //create rect x and y values.
    const bars = data.map(d => {
      return {
        x: xScale(d.date),
        y: yScale(d.value),
        height: height - yScale(d.value) - margin.bottom
      };
    });

    return { bars };
  }

  componentDidUpdate() {
    d3.select(this.refs.xAxis)
      .transition()
      .duration(1000)
      .call(this.xAxis);
    d3.select(this.refs.yAxis)
      .transition()
      .duration(1000)
      .call(this.yAxis);
  }

  render() {
    return (
      <svg width={width} height={height}>
        {this.state.bars.map((d, i) => {
          return (
            <rect
              key={i}
              x={d.x}
              y={d.y}
              height={d.height}
              width={width / this.state.bars.length}
            />
          );
        })}

        <g>
          <g
            ref="xAxis"
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default BarChart;
