import React from "react";

const trackDateRange = props => {
  const dateRangeButtons = Object.keys(props.dateRangeDict).map(key => {
    return (
      <button
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
