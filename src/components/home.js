import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";

import { fetchData } from "../services";
import { processData } from "../helper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

  const data = (status) =>
    logData?.logsList?.length ? processData(logData?.logsList, status) : [];

  return (
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
          <DateTimePicker
            slotProps={{
              actionBar: {
                actions: ["clear"],
              },
            }}
            label="Time from"
            value={startDate}
            onAccept={setStartDate}
          />
          <DateTimePicker
            slotProps={{
              actionBar: {
                actions: ["clear"],
              },
            }}
            label="Time to"
            value={endDate}
            onAccept={setEndDate}
          />

          <Button
            disableElevation
            variant="contained"
            onClick={() => getLogs(moment().subtract(24, "hours"))}
          >
            Last 24 hours
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => getLogs(moment().subtract(7, "days"))}
          >
            Last 7 days
          </Button>
          <Button
            disableElevation
            variant="text"
            color="error"
            onClick={() => getLogs()}
          >
            Reset
          </Button>
        </Box>

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
          <Paper elevation={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: 2,
                width: "250px",
              }}
            >
              <div>Total number of unique users</div>
              <div>{logData?.totalUsers || "-"}</div>
            </Box>
          </Paper>
          <Paper elevation={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: 2,
                width: "250px",
              }}
            >
              <div>Total number of calls</div>
              <div>{logData?.totalData || "-"}</div>
            </Box>
          </Paper>
          <Paper elevation={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: 2,
                width: "250px",
              }}
            >
              <div>Total number of success</div>
              <div>{logData?.totalSuccessData || "-"}</div>
            </Box>
          </Paper>
          <Paper elevation={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: 2,
                width: "250px",
              }}
            >
              <div>Total number of failures</div>
              <div>{logData?.totalFailedData || "-"}</div>
            </Box>
          </Paper>
        </Box>

        {isFetchingData ? (
          <CircularProgress />
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>User ID</StyledTableCell>
                    <StyledTableCell align="right">Timestamp</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">
                      Error Message
                    </StyledTableCell>
                    <StyledTableCell align="right">Request</StyledTableCell>
                    <StyledTableCell align="right">Response</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logData?.logsList?.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell component="th" scope="row">
                        {item.userId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(item.createdAt).format("DD-MM-YYYY hh:mm A")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Chip
                          label={item.status.toLowerCase()}
                          color={
                            item.status === "SUCCESS" ? `success` : `error`
                          }
                          variant="outlined"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.errMsg || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {(item.request && JSON.stringify(item.request)) || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {(item.response && JSON.stringify(item.response)) ||
                          "-"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              style={{ padding: "20px 0" }}
              variant="h4"
              component="h4"
            >
              Total no. of API calls
            </Typography>
            <div style={{ height: "600px", width: "100%" }}>
              <ResponsiveLine
                data={data()}
                enableArea={true}
                curve="natural"
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Timestamps",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "No. of API calls",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
            <Typography
              style={{ padding: "40px 0" }}
              variant="h4"
              component="h4"
            >
              Total no. of Failed API calls
            </Typography>
            <div style={{ height: "600px", width: "100%" }}>
              <ResponsiveLine
                data={data("FAILED")}
                enableArea={true}
                curve="natural"
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Timestamps",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "No. of failed API calls",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
