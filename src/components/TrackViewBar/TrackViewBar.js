import React from "react";
import Spinner from "../UI/Spinner/Spinner";
import "./TrackViewBar.css";

const trackViewBar = props => {
  let style = {
    transform: "scale(.5)",
    margin: "0px 65px",
    padding: "0"
  };
  return (
    <div className="TrackViews">
      {props.trackMetrics[410] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 410)}>
          {props.metricMetadata[410].fullName}
        </button>
      ) : (
        <Spinner style={style} />
      )}
      {props.trackMetrics[411] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 411)}>
          {props.metricMetadata[411].fullName}
        </button>
      ) : (
        <Spinner style={style} />
      )}
      {props.trackMetrics[413] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 413)}>
          {props.metricMetadata[413].fullName}
        </button>
      ) : (
        <Spinner style={style} />
      )}
      {props.trackMetrics[414] ? (
        <button onClick={props.handleTrackIdChange.bind(this, 414)}>
          {props.metricMetadata[414].fullName}
        </button>
      ) : (
        <Spinner style={style} />
      )}
    </div>
  );
};

export default trackViewBar;
