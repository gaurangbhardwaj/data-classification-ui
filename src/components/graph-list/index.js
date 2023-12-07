import React from "react";
import GraphComponent from "./graph";

const graphConfig = [
  {
    headerText: "Total no. of API calls",
    dataStatus: "",
  },
  {
    headerText: "Total no. of Success API calls",
    dataStatus: "SUCCESS",
  },
  {
    headerText: "Total no. of Failed API calls",
    dataStatus: "FAILED",
  },
];

const GraphList = ({ logData }, idx) => {
  return (
    <>
      {graphConfig.map(({ headerText, dataStatus }) => (
        <GraphComponent
          key={idx}
          headerText={headerText}
          dataStatus={dataStatus}
          logData={logData}
        />
      ))}
    </>
  );
};

export default GraphList;
