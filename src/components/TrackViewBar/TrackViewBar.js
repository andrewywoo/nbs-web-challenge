import React from "react";
import Spinner from "../UI/Spinner/Spinner";
import "./TrackViewBar.css";

const trackViewBar = props => {
  let style = {
    transform: "scale(.5)",
    margin: "0px 65px",
    padding: "0"
  };

  let views = [410, 411, 413, 414];
  let bar = null;

  //map ids with buttons or spinner if data not loaded yet.
  bar = views.map(id => {
    return props.trackMetrics[id] ? (
      //checking if button is the selected button.
      id === props.trackMetricId ? (
        <button
          className="selected-button"
          onClick={props.handleTrackIdChange.bind(this, id)}
        >
          {props.metricMetadata[id].fullName}
        </button>
      ) : (
        <button onClick={props.handleTrackIdChange.bind(this, id)}>
          {props.metricMetadata[id].fullName}
        </button>
      )
    ) : (
      <Spinner style={style} />
    );
  });

  return <div className="TrackViews">{bar}</div>;
};

export default trackViewBar;
