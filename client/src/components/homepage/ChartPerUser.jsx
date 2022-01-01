import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { FormControl, MenuItem } from "@mui/material";

import { getUsage, getUsers } from "../../api";
import AddNoteForm from "./AddNoteForm";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} seconds`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
function ChartPerUser() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (selectedUser) {
      getUsage({ userId: selectedUser, numberOfUsers: 1 })
        .then((res) => {
          const usage = res[0] && res[0].usage;
          setUserData(res[0]);
          const combinedSet = (usage || []).reduce(
            (acc, cur) => ({
              ...acc,
              [cur.name]: (acc[cur.name] || 0) + cur.seconds,
            }),
            {}
          );
          setData(
            Object.keys(combinedSet).map((key) => ({
              name: key,
              value: combinedSet[key],
            }))
          );
        })
        .catch((e) => console.error(e));
    }
  }, [selectedUser]);

  useEffect(() => getUsers(50).then((res) => setUsers(res)), []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelecteduser(value);
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <Typography variant="h6">Usage per User</Typography>
        <FormControl sx={{ m: 1, width: "100%", mt: 3 }}>
          <TextField
            fullWidth
            label="User"
            name="user"
            onChange={handleChange}
            select
            value={selectedUser}
            required
          >
            {(users || []).map((option) => (
              <MenuItem key={option.uuid} value={option.uuid}>
                {option.firstName}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <ResponsiveContainer width="100%" height="100%" aspect={2}>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </Grid>
      {userData && (
        <Grid item md={6} xs={12}>
          <AddNoteForm user={userData} />
        </Grid>
      )}
    </Grid>
  );
}

export default ChartPerUser;
