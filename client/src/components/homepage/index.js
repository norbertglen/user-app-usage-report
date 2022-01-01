import React from "react";
import { Typography } from "@mui/material";
import AggregateChart from "./AggregateChart";
import ChartPerUser from "./ChartPerUser";

function UserUsage() {

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>User Usage Report</Typography>
      <AggregateChart />
      <ChartPerUser />
    </>

  );
}

export default UserUsage;
