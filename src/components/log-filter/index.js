import React, { memo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

const LogFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  getLogs,
}) => {
  return (
    <>
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
    </>
  );
};

export default memo(LogFilter);
