import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash/debounce";
import BarChart from "./components/BarChart/BarChart";
import MetricViewBar from "./components/MetricViewBar/MetricViewBar";

class App extends Component {
  state = {
    artist: "",
    artistInfo: null,
    metrics: null,
    info: null,
    metricId: 41
  };

  constructor() {
    super();
    this.emitDebouncedSearch = debounce(this.handleArtistSearch, 500);
  }

  componentDidMount() {
    this.grabMetricInfo();
    if (this.state.artist) {
      this.grabArtistData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Only update artist data if new entry is not blank or different from prev entry
    if (this.state.artist) {
      if (this.state.artist !== prevState.artist) {
        this.grabArtistData();
      }
    }
  }

  grabMetricInfo() {
    axios
      .get("metrics/?fields=items.*")
      .then(response => {
        console.log(response.data);
        this.setState({ info: response.data });
      })
      .catch(error => console.log(error));
  }

  grabArtistData() {
    axios
      .get(`search/v1/artists/?query=${this.state.artist}&limit=1`)
      .then(response => {
        if (!response.data.artists.length) return null;
        const artistInfo = response.data.artists[0];
        //this.setState({ artistInfo: artistInfo });
        return axios.get(
          `artists/${
            artistInfo.id
          }/data?metricIds=28,41,11,151,247&startDate=2017-01-01&endDate=2017-12-31&timeseries=totals,deltas`
        );
      })
      .then(response => {
        if (response) {
          this.setState({ metrics: response.data });
          console.log("metrics", response.data);
          return axios.get(response.data.artist.self.url);
        }
      })
      .then(response => {
        if (response) {
          console.log("artistinfo", response.data);
          this.setState({ artistInfo: response.data });
        }
      })
      .catch(error => console.log(error));
  }

  handleChange = event => {
    this.emitDebouncedSearch(event.target.value);
  };

  handleArtistSearch = val => {
    this.setState({ artist: val });
  };

  getChartData = id => {
    const dataArr = this.state.metrics.data.filter(item => {
      return item.metricId === id;
    });
    if (dataArr.length) {
      const data = dataArr[0].timeseries.deltas;
      const chartData = Object.keys(data).map(keys => {
        return { date: new Date(keys), value: data[keys] };
      });
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

      //grab list of metric full names.
      metricNames = this.state.metrics.data
        .reduce((acc, metric) => {
          for (let m of this.state.info.items) {
            console.log(m);
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

      console.log(metricNames);
    }

    return (
      <>
        <div className="App">
          <input
            className="artist-search-input"
            type="text"
            placeholder="Search An Artist"
            onChange={this.handleChange.bind(this)}
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
