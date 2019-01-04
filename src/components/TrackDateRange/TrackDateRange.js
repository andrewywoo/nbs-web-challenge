import React from "react";

const trackDateRange = props => {
  const dateRangeButtons = Object.keys(props.dateRangeDict).map(key => {
    if (key === "LTD" && props.trackMetricId === 413) return null;
    if (key === "LTD" && props.trackMetricId === 414) return null;
    return key === props.trackDateRange ? (
      <button
        className="selected-button"
        style={{ margin: "12px 0" }}
        key={key}
        onClick={props.handleTrackDateRangeChange.bind(this, key)}
      >
        {props.dateRangeDict[key]}
      </button>
    ) : (
      <button
        style={{ margin: "12px 0" }}
        key={key}
        onClick={props.handleTrackDateRangeChange.bind(this, key)}
      >
        {props.dateRangeDict[key]}
      </button>
    );
  });

  return dateRangeButtons;
};

export default trackDateRange;
