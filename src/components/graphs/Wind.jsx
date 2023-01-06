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
  ReferenceLine,
} from "recharts";
import { useTheme } from "styled-components";
import moment from "moment";

const Wind = ({ deviceA}) => {
  const theme = useTheme();

  // Forming a custom data array containing pm1 values of deviceA with common timestamps
  const data = [];
  let maxWindSpeedA = { x: 0, y: 0 };
  let maxWindSpeedB = { x: 0, y: 0 };
  let maxWindSpeedC = { x: 0, y: 0 };
  if (!deviceA.loading) {
    deviceA.value.forEach((readingA, index) => {
      data.push({
        t: readingA.t,
        deviceA: readingA.w,
        
      });
      if (readingA.w > maxWindSpeedA.y) {
        maxWindSpeedA.y = readingA.w;
        maxWindSpeedA.x = readingA.t;
      }
      
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
          stroke="#f7ea00"
        />
        <ReferenceLine
          y={maxWindSpeedA.y}
          label={{ value: "Max speed at A", fill: theme.textPrimary }}
          stroke="#f7ea00dd"
          strokeDasharray="3 3"
        />
        
       

        <ReferenceLine
          x={maxWindSpeedA.x}
          stroke={theme.textPrimary}
          strokeDasharray="3 3"
        />
        
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Wind;
