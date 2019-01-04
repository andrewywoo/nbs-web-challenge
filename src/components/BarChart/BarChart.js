import React, { Component } from "react";
import Rect from "./Rect/Rect";
import moment from "moment";
import * as d3 from "d3";
import "./BarChart.css";
import Tooltip from "../Tooltip/Tooltip";

//setting up global values for svg height and width
const margin = { left: 100, top: 20, right: 20, bottom: 50 };
const height = 480 - margin.top - margin.bottom;
const width = 800 - margin.left - margin.right;

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
    yExtent: null,
    metricId: null,
    startDate: null,
    endDate: null,
    artistId: null,
    hoveredBar: null
  };

  //setting up axis and tick formats
  xAxis = d3.axisBottom(this.state.xScale).tickFormat(d3.timeFormat("%b-%Y"));
  yAxis = d3.axisLeft(this.state.yScale);

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("getDerivedStateFromProps", nextProps, !nextProps);
    if (!nextProps) return null;

    const { chartData, startDate, endDate, metricId, artistId } = nextProps;
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

    return { bars, yScale, metricId, startDate, endDate, artistId };
  }

  //Only update barChart if data has been changed.
  shouldComponentUpdate(nextProps, nextState) {
    //console.log("shouldComponentUpdate", nextProps, this.state);
    return (
      nextProps.metricId !== this.state.metricId ||
      nextProps.startDate !== this.state.startDate ||
      nextProps.endDate !== this.state.endDate ||
      nextProps.artistId !== this.state.artistId ||
      nextState.hoveredBar !== this.state.hoveredBar
    );
  }

  //happens once. render x and y axis on loadup.
  componentDidMount() {
    this.drawAxis();
  }

  //update axis when component updates
  componentDidUpdate(prevProps, prevState) {
    this.drawAxis();
  }

  drawAxis() {
    d3.select(this.refs.xAxis)
      .transition()
      .duration(800)
      .call(this.xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    d3.select(this.refs.yAxis)
      .transition()
      .duration(800)
      .call(this.yAxis);
  }

  onMouseOverCallback = d => {
    this.setState({ hoveredBar: d });
  };
  onMouseOutCallback = d => {
    this.setState({ hoveredBar: null });
  };

  render() {
    return (
      <div>
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
                  onMouseOverCallback={this.onMouseOverCallback.bind(this, d)}
                  onMouseOutCallback={this.onMouseOutCallback.bind(this, null)}
                />
              );
            })}
            <g ref="xAxis" transform={`translate(0, ${height})`} />
            <g ref="yAxis" />

            <text
              className="BarChart-yLabel"
              x={-(height / 2)}
              y={-80}
              transform="rotate(-90)"
              textAnchor="middle"
            >
              {this.props.yLabel}
            </text>
          </g>
        </svg>
        {this.state.hoveredBar ? (
          <Tooltip
            hoveredBar={this.state.hoveredBar}
            xScale={this.state.xScale}
            yScale={this.state.yScale}
          />
        ) : null}
      </div>
    );
  }
}

export default BarChart;
