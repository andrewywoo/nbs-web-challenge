import React, { Component } from "react";
import Rect from "./Rect/Rect";
import moment from "moment";
import * as d3 from "d3";

//setting up global values for svg height and width
const margin = { left: 60, top: 20, right: 20, bottom: 50 };
const height = 500 - margin.top - margin.bottom;
const width = 700 - margin.left - margin.right;

class BarChart extends Component {
  state = {
    bars: [],
    xScale: d3.scaleTime().range([0, width]),
    yScale: d3.scaleLinear().range([height, 0]),
    //yScale: d3.scaleLog().range([height, 0]),
    wScale: d3
      .scaleBand()
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0),
    accentScale: d3.scaleSequential(d3.interpolateRdBu),
    yExtent: null
  };

  //setting up axis and tick formats
  xAxis = d3.axisBottom(this.state.xScale).tickFormat(d3.timeFormat("%b-%Y"));
  yAxis = d3.axisLeft(this.state.yScale);
  //.ticks(4)
  //.tickFormat(function(d) {
  // return d;
  //});

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("getDerivedStateFromProps", nextProps, !nextProps);
    if (!nextProps) return null;

    const { chartData, startDate, endDate } = nextProps;
    //console.log(data);
    const { xScale, yScale, wScale, accentScale } = prevState;

    //clean data
    const data = chartData
      .filter(d => {
        let sDate = moment.unix(startDate);
        let eDate = moment.unix(endDate);
        let date = moment(d.date);
        return d.value && d.date && date >= sDate && date <= eDate;
      })
      .map(d => {
        d.value = +d.value;
        return d;
      });

    //recalculate scales with new data
    xScale.domain(d3.extent(data, d => d.date));
    yScale.domain([0, d3.max(data, d => d.value)]);
    //Below is yscale for log
    //const yExtent = d3.extent(data, d => d.value);
    //yScale.domain(d3.extent(data, d => d.value));
    wScale.domain(data.map(d => d.date));
    accentScale.domain([d3.max(data, d => d.value), 0]);

    //create rect x and y values.
    const bars = data.map(d => {
      return {
        x: xScale(d.date),
        y: yScale(d.value),
        height: height - yScale(d.value),
        fill: accentScale(d.value)
      };
    });

    return { bars, yScale };
  }

  //Only update barChart if data has been changed.
  shouldComponentUpdate(nextProps, nextState) {
    //console.log("shouldComponentUpdate: this.state =", this.state);
    //console.log("shouldComponentUpdate: nextSate =", nextState);
    //console.log(this.state.bars !== nextState.bars);
    return true;
  }

  //happens once. render x and y axis on loadup.
  componentDidMount() {
    d3.select(this.refs.xAxis)
      .transition()
      .duration(800)
      .call(this.xAxis);
    d3.select(this.refs.yAxis)
      .transition()
      .duration(800)
      .call(this.yAxis);
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
              <Rect
                key={i}
                x={d.x}
                y={d.y}
                height={d.height}
                width={this.state.wScale.bandwidth()}
                fill={d.fill}
                yScale={this.state.yScale}
                // yExtent={this.state.yExtent}
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
