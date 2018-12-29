import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

const publicKey = "eb74a82009cbc53c9b44866743633f9d";

axios.defaults.baseURL = "https://api.nextbigsound.com/";
axios.defaults.params = {};
axios.defaults.params["access_token"] = publicKey;

ReactDOM.render(<App />, document.getElementById("root"));
