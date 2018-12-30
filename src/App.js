import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash/debounce";
import BarChart from "./components/BarChart/BarChart";
import MetricViewBar from "./components/MetricViewBar/MetricViewBar";
import SearchOptions from "./components/SearchOptions/SearchOptions";
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
    endDate: moment("2018-12-31").format("YYYY-MM-DD")
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

  //redo this. -AWOO
  getChartData = id => {
    const dataArr = this.state.metrics.data.filter(item => {
      return item.metricId === id;
    });
    if (dataArr.length) {
      const data = dataArr[0].timeseries.deltas;
      const chartData = Object.keys(data).map(keys => {
        return { date: new Date(keys), value: data[keys] };
      });
      console.log(chartData);
      return chartData;
    }
  };

  handleMetricIdChange = id => {
    this.setState({ metricId: id });
  };

  render() {
    //initialize dom elements as nulls until artis data is retrieved.
    let image, info, genre, barChart, metricNames;

    if (this.state.artistInfo) {
      image = (
        <img
          height="100"
          src={this.state.artistInfo.images[0][100]}
          alt="Artist"
        />
      );
      info = <h1>Artist Name: {this.state.artistInfo.name}</h1>;
      genre = <h2>Genre: {this.state.artistInfo.genres.join(" ")}</h2>;
    }

    if (this.state.metrics) {
      // populate barchart with data
      barChart = <BarChart data={this.getChartData(this.state.metricId)} />;

      //grab list of metric names.
      metricNames = this.state.metrics.data
        .reduce((acc, metric) => {
          for (let m of this.state.metricMetadata.items) {
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
          <SearchOptions
            handleArtistChange={this.handleArtistChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
          <div className="artist-info">
            {image}
            <div style={{ textAlign: "center" }}>
              {info}
              {genre}
            </div>
          </div>
          {barChart}
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
