import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash/debounce";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ArtistInfo from "./containers/ArtistInfo/ArtistInfo";
import SocialMediaMetrics from "./containers/SocialMediaMetrics/SocialMediaMetrics";
import TrackMetrics from "./containers/TrackMetrics/TrackMetrics";
import moment from "moment";

class App extends Component {
  state = {
    artist: "",
    artistId: "",
    artistInfo: null,
    metrics: null,
    metricMetadata: null,
    metricId: 41,
    trackMetricId: 410,
    trackMetrics: {},
    startDate: moment(new Date())
      .subtract(5, "y")
      .unix(),
    endDate: moment(new Date()).unix(),
    bubbleData: [],
    isLoaded: false
  };

  constructor(props) {
    super(props);
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

  resetArtistInfo() {
    this.setState({ trackMetrics: {}, metrics: null, artistInfo: null });
  }

  //Grabs the metric meta data.
  grabMetricMetadata() {
    axios
      .get("metrics/?fields=items.*")
      .then(response => {
        //grab fullname and descriptions for corresponding ids.
        let metricTitles = response.data.items.reduce((acc, m) => {
          acc[m.id] = { fullName: m.fullName, description: m.description };
          return acc;
        }, {});

        this.setState({ metricMetadata: metricTitles });
      })
      .catch(error => console.log(error, "grabMetricMetadata"));
  }

  //method to grab artist metrics.
  grabArtistMetric() {
    //Grab 5 years of data
    const startDate = moment(new Date())
      .subtract(5, "y")
      .format("YYYY-MM-DD");
    const endDate = moment(new Date()).format("YYYY-MM-DD");

    //API searches for one artist.
    axios
      .get(`search/v1/artists/?query=${this.state.artist}&limit=1`)
      .then(response => {
        if (!response.data.artists.length) return null;

        //When searching for new artist. Set is loaded to true. Add spinner bars for each section.
        this.setState({ isLoaded: true });
        this.resetArtistInfo();

        //Set state for artist info.
        const artistInfo = response.data.artists[0];
        this.setState({ artistId: artistInfo.id });

        //grab Track metrics
        this.grabTrackMetrics();

        //grab artist info
        this.grabArtistInfo();

        //set metrics to null when searching for new artist metrics;
        this.setState({ metrics: null });
        //Grabs Social Media Metrics
        //id: 28, 41, 11, 151, 247
        return axios.get(
          `artists/${
            artistInfo.id
          }/data?metricIds=28,41,11,151,247&startDate=${startDate}&endDate=${endDate}&timeseries=totals,deltas`
        );
      })
      .then(response => {
        if (response) {
          this.setState({
            metrics: response.data,
            metricId: response.data.data[0].metricId
          });
          //console.log("metrics", response.data);
        }
      })
      .catch(error => console.log(error, "grabArtistMetric"));
  }

  //Grabs Artist Info
  grabArtistInfo() {
    //set artist info to null when searching for new artist info.
    this.setState({ artistInfo: null });

    axios
      .get(`artists/${this.state.artistId}/`)
      .then(response => {
        if (response) {
          //console.log("artistinfo", response.data);
          this.setState({ artistInfo: response.data });
        }
      })
      .catch(error => console.log(error, "grabArtistInfo"));
  }

  //Grab Artist Track Metrics
  grabTrackMetrics() {
    //set track Metrics to null when searching new metrics.
    this.setState({ trackMetrics: {} });

    //grab track metrics in order.
    axios
      .get(`metrics/v1/entity/${this.state.artistId}/nestedAssets?metric=410`)
      .then(response => {
        console.log("track metric410", response.data);
        const tMetric = { ...this.state.trackMetrics };
        //if theres no track metrics. API returns empty array. set trackMetrics state null
        if (!response.data.data) {
          tMetric[410] = null;
        } else {
          tMetric[410] = response.data;
        }
        this.setState({ trackMetrics: tMetric });
        return axios.get(
          `metrics/v1/entity/${this.state.artistId}/nestedAssets?metric=411`
        );
      })
      .then(response => {
        console.log("track metric411", response.data);
        const tMetric = { ...this.state.trackMetrics };
        //if theres no track metrics. API returns empty array. set trackMetrics state null
        if (!response.data.data) {
          tMetric[411] = null;
        } else {
          tMetric[411] = response.data;
        }
        this.setState({ trackMetrics: tMetric });
        return axios.get(
          `metrics/v1/entity/${this.state.artistId}/nestedAssets?metric=413`
        );
      })
      .then(response => {
        console.log("track metric413", response.data);
        const tMetric = { ...this.state.trackMetrics };
        //if theres no track metrics. API returns empty array. set trackMetrics state null
        if (!response.data.data) {
          tMetric[413] = null;
        } else {
          tMetric[413] = response.data;
        }
        this.setState({ trackMetrics: tMetric });
        return axios.get(
          `metrics/v1/entity/${this.state.artistId}/nestedAssets?metric=414`
        );
      })
      .then(response => {
        console.log("track metric414", response.data);
        const tMetric = { ...this.state.trackMetrics };
        //if theres no track metrics. API returns empty array. set trackMetrics state null
        if (!response.data.data) {
          tMetric[414] = null;
        } else {
          tMetric[414] = response.data;
        }
        this.setState({ trackMetrics: tMetric });
      })
      .catch(error => console.log(error, "grabTrackMetrics"));
  }

  //Filters through an array of metric arrays and returns matching metric ID to pass to barChart component.
  getChartData = id => {
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

      return chartData;
    }
  };

  //get track data
  getTrackData = id => {
    if (this.state.trackMetrics[id]) {
      return this.state.trackMetrics[id].data.filter(data => {
        return data.summary.TW;
      });
    }
  };

  handleMetricIdChange = id => {
    if (this.state.metricId !== id) {
      this.setState({ metricId: id });
    }
  };

  onRangeChange = e => {
    //manage dates with moment js. convert to unix time format. set state for endDate-startDate
    if (this.state.startDate !== e[0] || this.state.endDate !== e[1]) {
      this.setState({ startDate: e[0], endDate: e[1] });
    }
  };

  handleTrackIdChange = id => {
    if (this.state.trackMetricId !== id) {
      this.setState({ trackMetricId: id });
    }
  };

  render() {
    let {
      artistInfo,
      metrics,
      metricId,
      metricMetadata,
      trackMetricId,
      trackMetrics,
      isLoaded,
      startDate,
      endDate
    } = this.state;

    return (
      <>
        <div className="App">
          <NavigationBar handleArtistChange={this.handleArtistChange} />

          {isLoaded ? (
            <>
              <ArtistInfo artistInfo={artistInfo} isLoaded={isLoaded} />

              <SocialMediaMetrics
                isLoaded={isLoaded}
                metrics={metrics}
                onRangeChange={this.onRangeChange}
                handleMetricIdChange={this.handleMetricIdChange}
                metricMetadata={metricMetadata}
                getChartData={this.getChartData}
                metricId={metricId}
                startDate={startDate}
                endDate={endDate}
              />

              <TrackMetrics
                isLoaded={isLoaded}
                metricMetadata={metricMetadata}
                trackMetricId={trackMetricId}
                trackMetrics={trackMetrics}
                getTrackData={this.getTrackData}
                handleTrackIdChange={this.handleTrackIdChange}
              />
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default App;
