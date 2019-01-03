import React from "react";
import "./TrackViewBar.css";

const trackViewBar = props => {
  return (
    <div className="TrackViews">
      {props.trackMetrics[410] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 410)}>
          {props.metricMetadata[410].fullName}
        </button>
      ) : null}
      {props.trackMetrics[411] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 411)}>
          {props.metricMetadata[411].fullName}
        </button>
      ) : null}
      {props.trackMetrics[413] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 413)}>
          {props.metricMetadata[413].fullName}
        </button>
      ) : null}
      {props.trackMetrics[414] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 414)}>
          {props.metricMetadata[414].fullName}
        </button>
      ) : null}
    </div>
  );
};

export default trackViewBar;
