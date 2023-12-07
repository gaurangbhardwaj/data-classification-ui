// Lib dependency
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import moment from "moment";

// Components
import LogFilter from "./log-filter";
import GraphListComponent from "./graph-list";
import InfoTabsComponent from "./info-tabs";
import LogsListComponent from "./logs-list";

import { fetchData } from "../services";

const Home = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [logData, setLogData] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(false);

  const getLogs = async (startDate, endDate) => {
    try {
      setIsFetchingData(true);
      const logData = await fetchData(startDate, endDate);
      setLogData(logData);
    } catch (error) {
      console.error("[getLogs] Error fetching data:", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    getLogs(
      startDate?.$d ? moment(startDate?.$d) : "",
      endDate?.$d ? moment(endDate?.$d) : ""
    );
  }, [startDate, endDate]);

  return (
    <Paper style={{ width: "100%", minHeight: "100vh", borderRadius: "unset" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          width: "100%",
          maxWidth: "1200px",
          overflow: "auto",
          p: "30px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            overflow: "auto",
            gap: "20px",
          }}
        >
          <Typography variant="h4" component="h2">
            Data Visualization
          </Typography>

          <LogFilter
            logData={logData}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            getLogs={getLogs}
          />

          {isFetchingData ? (
            <CircularProgress />
          ) : (
            <>
              {logData && (
                <>
                  <InfoTabsComponent logData={logData} />
                  <LogsListComponent logData={logData} />
                  <GraphListComponent logData={logData} />
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Home;
