import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

  const uniqueStores = [
    "All",
    ...new Set(chartdatastore.map((item) => item.store)),
  ];

  const filteredData =
    selectedStore === "All"
      ? chartdatastore
      : chartdatastore.filter((item) => item.store === selectedStore);
      if (!chartdatastore || chartdatastore.length === 0) {
        return <p style={{ color: "white" }}>No data available</p>;
      }
      
  console.log(JSON.stringify(filteredData, null, 2));

  return (
    <div
      style={{ backgroundColor: "#222", padding: "20px", borderRadius: "12px" }}
    >
      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>
        Gross Margin Analysis
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ color: "#fff", marginRight: "10px" }}>
          Select Store:
        </label>
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
      <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            angle={-90}
            interval={0}
            textAnchor="end"
            tick={{ fill: "#fff" }}
            // tickMargin={10}
          />

          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fill: "#84d8ff" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#FF6F3C"
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            tick={{ fill: "#FF6F3C" }}
            domain={[0, 80]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "8px",
            }}
            formatter={(value, name) => {
              if (!value || isNaN(Number(value))) return "-"; 
            
              if (name === "GM %") {
                return `${Number(value).toFixed(1)}%`;
              }
            
              return `$${Number(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;
            }}
          />

<Legend 
  verticalAlign="bottom"
  align="center"
  layout="horizontal"
  wrapperStyle={{ color: "#fff", marginTop: "10px", padding: "20px 0" }}
  iconSize={10}  
/>


          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#5CA7FF"
            barSize={10}
            name="GM Dollars"
          />

          <Line
            yAxisId="right"
            // type="monotone"
            dataKey="gmPercent"
            stroke="#FF6F3C"
            strokeWidth={3}
            dot={{ r: 0 }}
            // activeDot={{ r: 7 }}
            name="GM %"
          />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsPage;
