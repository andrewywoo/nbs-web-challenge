import React from "react";
import "./MetricViewBar.css";

const metricViewBar = props => {
  let buttons;

  if (props.metricNames) {
    buttons = props.metricNames.map(obj => {
      return (
        <button onClick={props.clicked.bind(this, obj.id)}>
          {obj.fullName}
        </button>
      );
    });
  }

  return <div className="metric-view-bar">{buttons}</div>;
};

export default metricViewBar;
