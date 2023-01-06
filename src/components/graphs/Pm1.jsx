import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useTheme } from "styled-components";
import moment from "moment";

const Pm1 = ({ deviceA}) => {
  const theme = useTheme();

  // Forming a custom data array containing pm1 values of deviceA with common timestamps
  const data = [];
  if (!deviceA.loading ) {
    deviceA.value.forEach((readingA, index) => {
      data.push({
        t: readingA.t,
        deviceA: readingA.p1,
        
      });
    });
  }

  return (
    <ResponsiveContainer width="100%" aspect={16 / 9}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid
          stroke={theme.gridColor}
          strokeDasharray="3 3"
          strokeWidth="0.5"
        />
        <XAxis
          dataKey="t"
          name="Time"
          type="number"
          domain={["dataMin", "dataMax"]}
          scale="time"
          style={{ fontSize: "10px" }}
          tickFormatter={(epoch) => moment(epoch * 1000).format("H:mm, MMM Do")}
        />

        <YAxis style={{ fontSize: "12px" }} />
        <Tooltip
          labelFormatter={(epoch) =>
            moment(epoch * 1000).format("H:mm, MMM Do, YY")
          }
        />
        <Legend align="right" verticalAlign="top" height={36} />
        <Line
          name="A"
          strokeWidth="1.5px"
          dot={false}
          type="monotone"
          dataKey="deviceA"
          stroke="#8884d8"
        />
        
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Pm1;
