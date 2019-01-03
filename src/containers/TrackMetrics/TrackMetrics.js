import React from "react";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./TrackMetrics.css";

const trackMetrics = props => {
  let circleData = null;
  let content = null;
  let bubbleTitle = null;
  let bubbleTitles = {};

  if (props.isLoaded) {
    content = <Spinner />;
  }

  if (props.trackMetrics[props.trackMetricId]) {
    circleData = props.getTrackData(props.trackMetricId);

    bubbleTitle = props.metricMetadata.items.filter(
      m => m.id === props.trackMetricId
    )[0].fullName;

    //spot holder
    bubbleTitles = props.metricMetadata.items.reduce((acc, m) => {
      acc[m.id] = m.fullName;
      return acc;
    }, {});

    content = (
      <>
        {props.trackMetrics[410] ? (
          <button onClick={props.handleTrackIdChange.bind(this, 410)}>
            Pandora Radio Plays
          </button>
        ) : (
          "null"
        )}
        {props.trackMetrics[411] ? (
          <button onClick={props.handleTrackIdChange.bind(this, 411)}>
            Pandora Interactive Plays
          </button>
        ) : (
          "null"
        )}
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
