import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#f5222d",
  "#eb2f96"
];

const PieGraph = ({ data, handleChange, value }) => {
  return (
    <React.Fragment>
      <ResponsiveContainer
        width="100%"
        height="80%"
        aspect={window.innerWidth < 768 ? 1.5 : 2}
      >
        <PieChart width={800} height={365}>
          <Pie
            data={data}
            innerRadius={60}
            onClick={pie => {
              if (pie.name === value) {
                handleChange(null);
              } else {
                handleChange(pie.name);
              }
            }}
            outerRadius={100}
            fill="#3f51b5"
            paddingAngle={10}
            dataKey="prizes"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                stroke={COLORS[index % COLORS.length]}
                fill={
                  value === entry.name ? COLORS[index % COLORS.length] : "white"
                }
              />
            ))}
            <Legend />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="pie-labels">
        {data.map((entry, index) => (
          <div
            className={`label ${entry.name === value ? "active" : ""}`}
            onClick={() => {
              if (entry.name === value) {
                handleChange(null);
              } else {
                handleChange(entry.name);
              }
            }}
            key={entry.name}
          >
            <div
              className="color"
              style={{
                background:
                  entry.name === value
                    ? COLORS[index % COLORS.length]
                    : "white",
                border: `1px solid ${COLORS[index % COLORS.length]}`
              }}
            />
            <div className="name">{entry.name}</div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default PieGraph;
