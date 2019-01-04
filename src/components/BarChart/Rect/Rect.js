import React, { Component } from "react";
import * as d3 from "d3";

class Rect extends Component {
  state = { x: null, y: null, width: null, height: null, fill: null };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps) return null;

    return {
      x: nextProps.x,
      y: nextProps.y,
      width: nextProps.width,
      height: nextProps.height,
      fill: nextProps.fill
    };
  }

  componentDidMount() {
    this.animateRect();
  }

  componentDidUpdate() {
    this.animateRect();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.x !== this.state.x ||
      nextProps.y !== this.state.y ||
      nextProps.width !== this.state.width ||
      nextProps.height !== this.state.height ||
      nextProps.fill !== this.state.fill
    );
  }

  animateRect() {
    const { y, height } = this.state;

    let rect;

    //use yExtent if exists, if not use linear scale from range 0
    if (this.props.yExtent) {
      rect = d3
        .select(this.refs.rect)
        .attr("y", this.props.yScale(this.props.yExtent[0]));
    } else {
      rect = d3.select(this.refs.rect).attr("y", this.props.yScale(0));
    }

    //set up bar transition
    rect
      .attr("height", 0)
      .transition()
      .duration(800)
      .attr("y", y)
      .attr("height", height);
  }

  render() {
    const { x, y, height, width, fill } = this.state;

    return (
      <rect
        onMouseOver={this.props.onMouseOverCallback}
        onMouseOut={this.props.onMouseOutCallback}
        ref="rect"
        x={x}
        y={y}
        height={height}
        width={width}
        fill={fill}
      />
    );
  }
}

export default Rect;
