import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BarGraph = ({ data, value, handleChange }) => {
  return (
    <ResponsiveContainer width="100%" height="80%" aspect={2}>
      <BarChart
        width={500}
        height={300}
        data={data}
        onClick={bar => {
          if (value === bar.activeLabel) {
            handleChange(null);
          } else {
            handleChange(bar.activeLabel);
          }
        }}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
        barSize={window.innerWidth < 768 ? 15 : 20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="prizes" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell
              key={entry.country}
              stroke={COLORS[index % COLORS.length]}
              fill={
                value === entry.country
                  ? COLORS[index % COLORS.length]
                  : "white"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
