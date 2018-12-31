import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash/debounce";
import MetricViewBar from "./components/MetricViewBar/MetricViewBar";
import SearchOptions from "./components/SearchOptions/SearchOptions";
import ArtistInfo from "./components/ArtistInfo/ArtistInfo";
import SocialMediaMetrics from "./components/SocialMediaMetrics/SocialMediaMetrics";
import BubbleChart from "./components/BubbleChart/BubbleChart";
import moment from "moment";

class App extends Component {
  state = {
    artist: "",
    artistId: "",
    artistInfo: null,
    metrics: null,
    metricMetadata: null,
    metricId: 41,
    startDate: moment("2018-01-01").format("YYYY-MM-DD"),
    endDate: moment("2018-12-31").format("YYYY-MM-DD"),
    bubbleData: [
      { radius: Math.random() * 50 + 20 },
      { radius: Math.random() * 50 + 20 },
      { radius: Math.random() * 50 + 20 },
      { radius: Math.random() * 50 + 20 }
    ]
  };

  constructor() {
    super();
    this.emitDebouncedSearch = debounce(this.handleArtistSearch, 500);
  }
  //Search Artis Event Handlers
  handleArtistChange = event => {
    this.emitDebouncedSearch(event.target.value);
  };
  handleArtistSearch = val => {
    this.setState({ artist: val });
  };

  componentDidMount() {
    this.grabMetricMetadata();
    if (this.state.artist) {
      this.grabArtistMetric();
      //this.grabArtistInfo();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Only update artist data if new entry is not blank or different from prev entry
    if (this.state.artist) {
      if (this.state.artist !== prevState.artist) {
        this.grabArtistMetric();
        //this.grabArtistInfo();
      }
    }
  }

  //Grabs the metric meta data.
  grabMetricMetadata() {
    axios
      .get("metrics/?fields=items.*")
      .then(response => {
        this.setState({ metricMetadata: response.data });
      })
      .catch(error => console.log(error, "grabMetricMetadata"));
  }

  grabArtistMetric() {
    axios
      .get(`search/v1/artists/?query=${this.state.artist}&limit=1`)
      .then(response => {
        if (!response.data.artists.length) return null;
        const artistInfo = response.data.artists[0];
        this.setState({ artistId: artistInfo.id });
        return axios.get(
          `artists/${artistInfo.id}/data?metricIds=28,41,11,151,247&startDate=${
            this.state.startDate
          }&endDate=${this.state.endDate}&timeseries=totals,deltas`
        );
      })
      .then(response => {
        if (response) {
          this.setState({
            metrics: response.data,
            metricId: response.data.data[0].metricId
          });
          //console.log("metrics", response.data);
          return this.grabArtistInfo();
        }
      })
      .then(response => {
        if (response) {
          //console.log("artistinfo", response.data);
          this.setState({ artistInfo: response.data });
        }
      })
      .catch(error => console.log(error, "grabArtistMetric"));
  }

  grabArtistInfo() {
    return axios
      .get(`artists/${this.state.artistId}/`)
      .catch(error => console.log(error, "grabArtistInfo"));
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: moment(date).format("YYYY-MM-DD")
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: moment(date).format("YYYY-MM-DD")
    });
  };

  getChartData = id => {
    //Filters through an array of max 5 metric arrays.
    const dataArr = this.state.metrics.data.filter(item => {
      return item.metricId === id;
    });

    //if data exists for metric id. grab deltas or totals
    //refactor this code to create data with both deltas and totals. -AWOO
    if (dataArr.length) {
      let data;
      if (id === 41 || id === 247) {
        data = dataArr[0].timeseries.deltas;
      } else {
        data = dataArr[0].timeseries.totals;
      }
      const chartData = Object.keys(data).map(keys => {
        return { date: new Date(keys), value: data[keys] };
      });
      //console.log(chartData);
      return chartData;
    }
  };

  handleMetricIdChange = id => {
    if (this.state.metricId !== id) {
      this.setState({ metricId: id });
    }
  };

  //TODO - AWOO - use this method to update date range with range slider.
  onRangeChange = e => {
    console.log(e);
  };

  //TODO - Bubble Handler
  handleBubbles = () => {
    this.setState({
      bubbleData: [
        { radius: Math.random() * 50 + 20 },
        { radius: Math.random() * 50 + 20 },
        { radius: Math.random() * 50 + 20 }
      ]
    });
  };

  render() {
    let { artistInfo, metrics, metricId, metricMetadata } = this.state;
    //initialize dom elements as nulls until artis data is retrieved.
    let metricNames, data;

    //create data only after metrics was fetched from API
    if (metrics) {
      data = this.getChartData(metricId);

      //grab list of metric names.
      metricNames = metrics.data
        .reduce((acc, metric) => {
          for (let m of metricMetadata.items) {
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
    }

    return (
      <>
        <div className="App">
          <SearchOptions handleArtistChange={this.handleArtistChange} />

          <ArtistInfo artistInfo={artistInfo} />

          <BubbleChart data={this.state.bubbleData} />
          <button onClick={this.handleBubbles}>Change Bubbles</button>

          <SocialMediaMetrics data={data} onRangeChang={this.onRangeChange} />

          <MetricViewBar
            clicked={this.handleMetricIdChange}
            metricNames={metricNames}
          />
        </div>
      </>
    );
  }
}

export default App;
