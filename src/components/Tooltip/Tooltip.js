import React from "react";
import moment from "moment";
import * as d3 from "d3";
import "./Tooltip.css";

const toolTip = props => {
  const { xScale, yScale } = props;
  const styles = {
    left: props.hoveredBar.x,
    top: props.hoveredBar.y
  };

  return (
    <div className="Tooltip" style={styles}>
      <table>
        <thead>
          <tr>
            <th colSpan="2" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="1">Date:</td>
            <td colSpan="1">
              {moment(xScale.invert(props.hoveredBar.x)).format("MMM Do YYYY")}
            </td>
          </tr>
          <tr>
            <td colSpan="1">Value:</td>
            <td colSpan="1">
              {d3.format(",.0f")(yScale.invert(props.hoveredBar.y))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default toolTip;
