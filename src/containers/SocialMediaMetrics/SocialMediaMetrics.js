import React from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import BarChart from "../../components/BarChart/BarChart";
import MetricViewBar from "../../components/MetricViewBar/MetricViewBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Slider from "rc-slider";
import moment from "moment";
import "rc-slider/assets/index.css";
import "./SocialMediaMetrics.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

//get 5 years ago in unix time
const startDateUnix = moment(new Date())
  .subtract(5, "y")
  .unix();
//get todays date in unix time
const endDateUnix = moment(new Date()).unix();

const socialMediaMetrics = props => {
  // let barChart = null;
  let data = null;
  let metricNames = null;
  let content = null;
  let chartTitle = null;
  let yLabel = null;

  if (props.isLoaded) {
    content = <Spinner />;
  }
  //only do work if metrics is not null;
  if (props.metrics) {
    //Grab data if metric Id was changed
    data = props.getChartData(props.metricId);

    //grab list of metric names. gets passed into metric view bar.
    metricNames = props.metrics.data
      .reduce((acc, metric) => {
        //look up fullName for each existing metric for artist.
        let m = props.metricMetadata[metric.metricId];
        if (m) {
          acc.push({ fullName: m.fullName, id: metric.metricId });
        }
        return acc;
      }, [])
      .sort((a, b) => {
        return a.id - b.id;
      });

    chartTitle = props.metricMetadata[props.metricId].fullName;

    //grab the last word for y label. gets passed into bar chart.
    let cArr = chartTitle.split(" ");
    yLabel = cArr[cArr.length - 1];

    //grab first date inside data.
    let chartStartDate = moment(data[0].date).unix();

    content = (
      <>
        <MetricViewBar
          clicked={props.handleMetricIdChange}
          metricNames={metricNames}
          chartTitle={chartTitle}
          metricId={props.metricId}
        />
        <h1 style={{ marginBottom: ".3em" }}>{chartTitle}</h1>
        <BarChart
          chartData={data}
          yLabel={yLabel}
          metricId={props.metricId}
          startDate={props.startDate}
          endDate={props.endDate}
          artistId={props.artistId}
        />
        <span className="SocialMediaMetrics__metrics-date-range">
          {chartStartDate > props.startDate
            ? moment.unix(chartStartDate).format("MMM Do YYYY")
            : moment.unix(props.startDate).format("MMM Do YYYY")}
          {"   -   "}
          {moment.unix(props.endDate).format("MMM Do YYYY")}
          <FontAwesomeIcon
            style={{ fontSize: "1.2rem", margin: "0 8px" }}
            title="Use the range slider below to edit the date range."
            icon={faInfoCircle}
          />
        </span>
        <Range
          className="SocialMediaMetrics__metrics-range-slider"
          defaultValue={[chartStartDate, props.endDate]}
          min={startDateUnix}
          max={endDateUnix}
          step={86400 /*1 day in seconds*/}
          allowCross={false}
          tipFormatter={value => moment.unix(value).format("MMM Do YYYY")}
          onAfterChange={props.onRangeChange}
        />
      </>
    );
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
