import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash/debounce";

class App extends Component {
  state = { artist: "Big Gigantic", artistInfo: null, metrics: null };

  constructor() {
    super();
    this.emitDebouncedSearch = debounce(this.handleArtistSearch, 500);
  }

  componentDidMount() {
    this.grabArtistData();
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
        console.log("artist", artistInfo);
        this.setState({ artistInfo: artistInfo });
        return axios.get(
          `https://api.nextbigsound.com/artists/${
            artistInfo.id
          }/data?metricIds=28,247&startDate=2017-01-01&endDate=2017-12-31&timeseries=totals,deltas&access_token=8f6f8a9b1b7c83257922892888218aea`
        );
      })
      .then(response => {
        if (response) {
          this.setState({ metrics: response.data });
          console.log("metrics", response.data);
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

  render() {
    let image = this.state.artistInfo ? (
      <img src={this.state.artistInfo.images[0][220]} alt="Artist" />
    ) : null;

    return (
      <>
        <div className="App">
          <input type="text" onChange={this.handleChange.bind(this)} />
          {this.state.metrics ? this.state.metrics.artistId : null}
        </div>
        {image}
      </>
    );
  }
}

export default App;
