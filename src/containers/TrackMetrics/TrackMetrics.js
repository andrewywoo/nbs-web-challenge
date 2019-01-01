import React from "react";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import "./TrackMetrics.css";

const trackMetrics = props => {
  let circleData = null;
  let bubbleChart = null;

  if (props.trackMetrics) {
    circleData = props.getTrackData();

    bubbleChart = (
      <div id="trackSpins" className="TrackMetrics">
        <div className="TrackMetrics__label">
          <span>Track Spins</span>
        </div>
        <div className="TrackMetrics__metrics">
          <BubbleChart data={circleData} />
          <button onClick={props.handleBubbles}>Change Bubbles</button>
        </div>
      </div>
    );
  }

  return bubbleChart;
};

export default trackMetrics;
