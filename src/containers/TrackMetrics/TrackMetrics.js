import React from "react";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./TrackMetrics.css";
import TrackViewBar from "../../components/TrackViewBar/TrackViewBar";
import TrackDateRange from "../../components/TrackDateRange/TrackDateRange";

const trackMetrics = props => {
  let circleData = null;
  let content = null;
  let bubbleTitle = null;
  let dateRangeDict = {
    TW: "This Week",
    LW: "Last Week",
    LM: "Last Month",
    YTD: "Year To Date",
    LTD: "Lifetime Value"
  };
  let dateRangeTitle;

  //props.trackDateRange

  if (props.isLoaded) {
    content = <Spinner />;
  }

  if (props.trackMetrics[props.trackMetricId]) {
    //grab bubble chart data with new metric id.
    circleData = props.getTrackData(props.trackMetricId);

    //grab chart title from metric dictionary.
    bubbleTitle = props.metricMetadata[props.trackMetricId].fullName;
    dateRangeTitle = dateRangeDict[props.trackDateRange];

    content = (
      <>
        <TrackViewBar
          trackMetrics={props.trackMetrics}
          handleTrackIdChange={props.handleTrackIdChange}
          metricMetadata={props.metricMetadata}
        />
        <h1 className="TrackMetrics__metrics-title">{bubbleTitle}</h1>
        <h2 className="TrackMetrics__metrics-range">{dateRangeTitle}</h2>
        <div className="TrackMetrics__section">
          <div className="TrackMetrics__section-range">
            <TrackDateRange
              handleTrackDateRangeChange={props.handleTrackDateRangeChange}
              dateRangeDict={dateRangeDict}
              trackMetricId={props.trackMetricId}
            />
          </div>
          <div>
            <BubbleChart
              className="BubbleChart"
              data={circleData}
              trackDateRange={props.trackDateRange}
              trackMetricId={props.trackMetricId}
              artistId={props.artistId}
            />
          </div>
        </div>
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
