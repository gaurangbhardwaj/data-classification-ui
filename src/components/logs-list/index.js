import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import moment from "moment";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LogsList = ({ logData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell align="right">Timestamp</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Error Message</StyledTableCell>
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
                  color={item.status === "SUCCESS" ? `success` : `error`}
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
                {(item.response && JSON.stringify(item.response)) || "-"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(LogsList);
