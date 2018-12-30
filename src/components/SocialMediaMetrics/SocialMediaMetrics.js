import React from "react";
import BarChart from "../BarChart/BarChart";
import Range from "rc-slider/lib/Range";
import "rc-slider/assets/index.css";
import "./SocialMediaMetrics.css";

const socialMediaMetrics = props => {
  let barChart = null;
  if (props.data) {
    // populate barchart with data
    barChart = (
      <>
        <BarChart data={props.data} />
        <Range
          className="range-slider"
          defaultValue={[0, 10]}
          min={0}
          max={10}
          allowCross={false}
          onChange={props.onRangeChange}
        />
      </>
    );
  }
  return barChart;
};

export default socialMediaMetrics;
