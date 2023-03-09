// Tract list component, displays a table of tracts

import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useFetchTracts } from "../hooks";
import { TRACT_DETAIL } from "../routes";
import type { Tract } from "../types";
import TractDetail from "./TractDetail";

type Tracts = Array<Tract>;

const TractList = () => {
  const [tracts, setTracts] = useState([] as Tracts);

  const fetchTracts = useFetchTracts();

  useEffect(() => {
    const fetchData = async () => {
      const tractList = await fetchTracts();
      setTracts(tractList);
    };

    fetchData();
  }, [fetchTracts]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 4rem)",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Tracts{tracts.length > 0 && ` (${tracts.length})`}
      </Typography>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table aria-label="Tract list table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>State</TableCell>
              <TableCell>County</TableCell>
              <TableCell>Tract CE</TableCell>
              <TableCell>GeoID</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflowY: "scroll" }}>
            {tracts.length === 0 && (
              <TableRow>
                <TableCell scope="row">Loading...</TableCell>
              </TableRow>
            )}
            {(tracts ?? []).map((tract) => (
              <TableRow key={tract.fid}>
                <TableCell component="th" scope="row">
                  <Link
                    href={TRACT_DETAIL.replace(":fid", tract.fid.toString())}
                  >
                    {tract.namelsad}
                  </Link>
                </TableCell>
                <TableCell>{tract.statefp}</TableCell>
                <TableCell>{tract.countyfp}</TableCell>
                <TableCell>{tract.tractce}</TableCell>
                <TableCell>{tract.geoid}</TableCell>
                <TableCell>{tract.intptlat}</TableCell>
                <TableCell>{tract.intptlon}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TractList;
