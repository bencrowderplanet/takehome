// Tract detail component, displays a table with the individual tract fields

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Link } from "wouter";
import { useFetchTractDetail } from "../hooks";
import type { Tract } from "../types";
import TractDetailRow from "./TractDetailRow";

interface TractDetailProps {
  params: {
    fid?: number;
  };
}

const TractDetail = ({ params: { fid } }: TractDetailProps) => {
  const [tract, setTract] = useState({} as Tract);

  const fetchTractDetail = useFetchTractDetail();

  useEffect(() => {
    const fetchData = async () => {
      if (!fid) {
        return;
      }

      const tractDetail = await fetchTractDetail(fid);
      setTract(tractDetail);
    };

    fetchData();
  }, [fid]);

  if (!tract || Object.keys(tract).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%", margin: "0 auto", maxWidth: 1400 }}>
      <Typography variant="h3" gutterBottom>
        {tract.namelsad}
      </Typography>
      <Link href="/">Back to tracts</Link>
      <TableContainer component={Paper}>
        <Table aria-label="Tract detail table">
          <TableBody>
            <TractDetailRow label="FID" value={tract.fid} />
            <TractDetailRow label="Name" value={tract.name} />
            <TractDetailRow label="State" value={tract.statefp} />
            <TractDetailRow label="County" value={tract.countyfp} />
            <TractDetailRow label="Tract CE" value={tract.tractce} />
            <TractDetailRow label="GeoID" value={tract.geoid} />
            <TractDetailRow label="MTFCC" value={tract.mtfcc} />
            <TractDetailRow label="FuncStat" value={tract.funcstat} />
            <TractDetailRow label="A Land" value={tract.aland} />
            <TractDetailRow label="A Water" value={tract.awater} />
            <TractDetailRow label="Latitude" value={tract.intptlat} />
            <TractDetailRow label="Longitude" value={tract.intptlon} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TractDetail;
