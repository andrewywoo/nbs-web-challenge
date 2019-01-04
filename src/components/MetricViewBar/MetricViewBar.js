import React from "react";
import "./MetricViewBar.css";

const metricViewBar = props => {
  let buttons;

  if (props.metricNames) {
    buttons = props.metricNames.map(obj => {
      return obj.id === props.metricId ? (
        <button
          key={obj.id}
          className="MetricView__buttons selected-button"
          onClick={props.clicked.bind(this, obj.id)}
        >
          {obj.fullName}
        </button>
      ) : (
        <button
          key={obj.id}
          className="MetricView__buttons"
          onClick={props.clicked.bind(this, obj.id)}
        >
          {obj.fullName}
        </button>
      );
    });
  }

  return <div className="MetricViews">{buttons}</div>;
};

export default metricViewBar;
