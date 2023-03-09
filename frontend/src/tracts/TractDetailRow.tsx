// Tract detail row component, one row in the tract detail table

import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

interface TractDetailRowProps {
  label: string;
  value: string | number;
}

const TractDetailRow = ({ label, value }: TractDetailRowProps) => (
  <TableRow>
    <TableCell component="th">{label}</TableCell>
    <TableCell>{(value ?? "").toString()}</TableCell>
  </TableRow>
);

export default TractDetailRow;
