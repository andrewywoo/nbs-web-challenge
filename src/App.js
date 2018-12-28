import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash/debounce";
import BarChart from "./components/BarChart/BarChart";

class App extends Component {
  state = { artist: "", artistInfo: null, metrics: null };

  constructor() {
    super();
    this.emitDebouncedSearch = debounce(this.handleArtistSearch, 500);
  }

  componentDidMount() {
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

  grabArtistData() {
    axios
      .get(
        `https://api.nextbigsound.com/search/v1/artists/?query=${
          this.state.artist
        }&limit=1&access_token=eb74a82009cbc53c9b44866743633f9d`
      )
      .then(response => {
        if (!response.data.artists.length) return null;
        const artistInfo = response.data.artists[0];
        //this.setState({ artistInfo: artistInfo });
        return axios.get(
          `https://api.nextbigsound.com/artists/${
            artistInfo.id
          }/data?metricIds=28,41,247&startDate=2017-01-01&endDate=2017-12-31&timeseries=totals,deltas&access_token=8f6f8a9b1b7c83257922892888218aea`
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

  getWikiViewData = () => {
    const wikiViews = this.state.metrics.data.filter(item => {
      return item.metricId === 41;
    });
    if (wikiViews.length) {
      const wikiData = wikiViews[0].timeseries.deltas;
      const data = Object.keys(wikiData).map(keys => {
        return { date: new Date(keys), value: wikiData[keys] };
      });
      return data;
    }
  };

  render() {
    let image, info, genre, barChart;

    if (this.state.artistInfo) {
      image = <img src={this.state.artistInfo.images[0][220]} alt="Artist" />;
      info = <h1>Artist Name: {this.state.artistInfo.name}</h1>;
      genre = <h2>{this.state.artistInfo.genres.join(" ")}</h2>;
    }

    if (this.state.metrics) {
      let wikiData = this.getWikiViewData();
      barChart = (
        <>
          <BarChart data={wikiData} />
          <h1>Wikipedia Views</h1>
        </>
      );
    }

    return (
      <>
        <div className="App">
          <input
            className="artist-search-input"
            type="text"
            onChange={this.handleChange.bind(this)}
          />
          <div className="artist-info">
            {image}
            <div>
              {info}
              {genre}
            </div>
          </div>
          {barChart}
        </div>
      </>
    );
  }
}

export default App;
