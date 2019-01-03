import React from "react";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./TrackMetrics.css";

const trackMetrics = props => {
  let circleData = null;
  let content = null;

  if (props.isLoaded) {
    content = <Spinner />;
  }

  if (props.trackMetrics) {
    circleData = props.getTrackData();
    content = (
      <>
        <BubbleChart className="BubbleChart" data={circleData} />
        <button onClick={props.handleBubbles}>Change Bubbles</button>
      </>
    );
  }

  return (
    <div id="trackSpins" className="TrackMetrics">
      <div className="TrackMetrics__label">
        <span>Track Spins</span>
      </div>
      <div className="TrackMetrics__metrics">{content}</div>
    </div>
  );
};

export default trackMetrics;
