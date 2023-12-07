import React, { memo } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const tabConfig = [
  {
    headerText: "Total number of unique users",
    infoTypeKey: "totalUsers",
  },
  {
    headerText: "Total number of calls",
    infoTypeKey: "totalData",
  },
  {
    headerText: "Total number of success",
    infoTypeKey: "totalSuccessData",
  },
  {
    headerText: "Total number of failures",
    infoTypeKey: "totalFailedData",
  },
];

const InfoTabs = ({ logData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {tabConfig.map(({ headerText, infoTypeKey }, idx) => (
        <Paper elevation={3} key={idx}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: 2,
              width: "260px",
            }}
          >
            <div>{headerText}</div>
            <div>{(logData && logData[infoTypeKey]) || "-"}</div>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default memo(InfoTabs);
