import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IStoreChartsData {
  week: string;
  gmDollars: number;
  salesDollars: number;
  gmPercent: number;
  store: string;
}

interface ChartsPageProps {
  chartdatastore: IStoreChartsData[];
}

const ChartsPage: React.FC<ChartsPageProps> = ({ chartdatastore }) => {
  const [selectedStore, setSelectedStore] = useState<string>("All");

  // Extract unique stores for the dropdown
  const uniqueStores = [
    "All",
    ...new Set(chartdatastore.map((item) => item.store)),
  ];

  // Filter data by selected store
  const filteredData =
    selectedStore === "All"
      ? chartdatastore
      : chartdatastore.filter((item) => item.store === selectedStore);

  return (
    <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "12px" }}>
      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>
        Gross Margin
      </h2>

      {/* Store Selection Dropdown */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <label style={{ color: "#fff", marginRight: "10px" }}>Select Store:</label>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          style={{
            background: "#444",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {uniqueStores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="week" tick={{ fill: "#fff" }} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fill: "#84d8ff" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ffa500"
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: "#ffa500" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "8px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ color: "#fff", marginTop: "10px" }}
          />

          {/* GM Dollars (Bars) */}
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#84d8ff"
            name="GM Dollars"
          />

          {/* GM Percent (Line) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#ffa500"
            strokeWidth={2}
            dot={false}
            name="GM %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsPage;
