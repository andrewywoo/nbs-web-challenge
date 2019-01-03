import React from "react";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./TrackMetrics.css";
import TrackViewBar from "../../components/TrackViewBar/TrackViewBar";

const trackMetrics = props => {
  let circleData = null;
  let content = null;
  let bubbleTitle = null;

  if (props.isLoaded) {
    content = <Spinner />;
  }

  if (props.trackMetrics[props.trackMetricId]) {
    //grab bubble chart data with new metric id.
    circleData = props.getTrackData(props.trackMetricId);

    //grab chart title from metric dictionary.
    bubbleTitle = props.metricMetadata[props.trackMetricId].fullName;

    content = (
      <>
        <TrackViewBar
          trackMetrics={props.trackMetrics}
          handleTrackIdChange={props.handleTrackIdChange}
          metricMetadata={props.metricMetadata}
        />
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
