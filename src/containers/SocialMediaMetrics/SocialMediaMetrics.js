import React from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import BarChart from "../../components/BarChart/BarChart";
import MetricViewBar from "../../components/MetricViewBar/MetricViewBar";
import Range from "rc-slider/lib/Range";
import "rc-slider/assets/index.css";
import "./SocialMediaMetrics.css";

const socialMediaMetrics = props => {
  // let barChart = null;
  let data = null;
  let metricNames = null;
  let content = null;

  if (props.isLoaded) {
    content = <Spinner />;
  }

  console.log(props.metrics);
  //only do work if metrics is not null;
  if (props.metrics) {
    //Grab data if metric Id was changed
    data = props.getChartData(props.metricId);
    //grab list of metric names.
    metricNames = props.metrics.data
      .reduce((acc, metric) => {
        for (let m of props.metricMetadata.items) {
          if (m.id === metric.metricId) {
            acc.push({ fullName: m.fullName, id: m.id });
            break;
          }
        }
        return acc;
      }, [])
      .sort((a, b) => {
        return a.id - b.id;
      });

    content = (
      <>
        <BarChart data={data} />
        <Range
          className="range-slider"
          defaultValue={[0, 10]}
          min={0}
          max={10}
          allowCross={false}
          onChange={props.onRangeChange}
        />
        <MetricViewBar
          clicked={props.handleMetricIdChange}
          metricNames={metricNames}
        />
      </>
    );

    // populate barchart with data
    // barChart = (
    //   <div id="socialMedia" className="SocialMediaMetrics">
    //     <div className="SocialMediaMetrics__label">
    //       <span>Social Media</span>
    //     </div>
    //     <div className="SocialMediaMetrics__metrics" />
    //   </div>
    // );
  }

  //return barChart;
  return (
    <div id="socialMedia" className="SocialMediaMetrics">
      <div className="SocialMediaMetrics__label">
        <span>Social Media</span>
      </div>
      <div className="SocialMediaMetrics__metrics">{content}</div>
    </div>
  );
};

export default socialMediaMetrics;
