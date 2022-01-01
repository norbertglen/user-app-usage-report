import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getUsage } from "../../api";

const numberOfUsers = 5;
function AggregateChart() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getUsage({ numberOfUsers }).then((res) => {
      setSeries(
        res.map((r) => {
          const combinedSet = r.usage.reduce(
            (acc, cur) => ({
              ...acc,
              [cur.name]: (acc[cur.name] || 0) + cur.seconds,
            }),
            {}
          );
          return {
            name: r.firstName,
            data: Object.keys(combinedSet).map((key) => ({
              category: key,
              value: combinedSet[key],
            })),
          };
        })
      );
    });
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        All Users Usage Chart
      </Typography>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          {series.map((s) => (
            <Line dataKey="value" data={s.data} name={s.name} key={s.name} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default AggregateChart;
