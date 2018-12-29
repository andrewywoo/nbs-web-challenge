import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import "./SearchOptions.css";

const searchOptions = props => {
  return (
    <div className="SearchOptions">
      <div>
        <label for="search">Artist:</label>
        <input
          id="search"
          className="artistSearchInput"
          type="text"
          placeholder="Search An Artist"
          onChange={props.handleArtistChange}
        />
      </div>
      <div>
        <label for="startDt">Start Date:</label>
        <DayPickerInput
          id="startDt"
          onDayChange={props.handleStartDateChange}
          formatDate={formatDate}
          format="YYYY-MM-DD"
          parseDate={parseDate}
          value={props.startDate}
        />
      </div>
      <div>
        <label for="endDt">End Date:</label>
        <DayPickerInput
          id="endDt"
          onDayChange={props.handleEndDateChange}
          formatDate={formatDate}
          format="YYYY-MM-DD"
          parseDate={parseDate}
          value={props.endDate}
        />
      </div>
    </div>
  );
};

export default searchOptions;
