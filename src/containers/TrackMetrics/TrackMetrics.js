import React from "react";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./TrackMetrics.css";

const trackMetrics = props => {
  let circleData = null;
  let content = null;
  let bubbleTitle = null;

  if (props.isLoaded) {
    content = <Spinner />;
  }

  if (props.trackMetrics) {
    circleData = props.getTrackData();

    bubbleTitle = props.metricMetadata.items.filter(
      m => m.id === props.trackMetricId
    )[0].fullName;

    content = (
      <>
        <button onClick={props.handleBubbles}>Change Bubbles</button>
        <h1 className="TrackMetrics__metrics-title">{bubbleTitle}</h1>
        <BubbleChart className="BubbleChart" data={circleData} />
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
