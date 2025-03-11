import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IStoreData } from "../data/storeData";
import {
  ColDef,
  ColGroupDef,
} from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "./planningpage.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PlanningGridProps {
  rowData: IStoreData[];
}

const PlanningGrid: React.FC<PlanningGridProps> = ({ rowData }) => {
  const columnDefs: (ColDef<IStoreData> | ColGroupDef<IStoreData>)[] = [
    { field: "Store", headerName: "Store" },
    { field: "SKU", headerName: "SKU" },

    {
      headerName: "Calendar",
      children: [
        {
          headerName: "January",
          children: [
            { field: "Week", headerName: "Week" },
            {
              field: "SalesUnits",
              headerName: "Sales Units",
              editable: true,
            },
            {
              headerName: "Sales Dollars",
              valueGetter: (params) => {
                const salesUnits = params.data?.SalesUnits ?? 0;
                const price = params.data?.Price ?? 0;
                return salesUnits * price;
              },
              valueFormatter: (params) =>
                `$ ${params.value?.toFixed(2) || "0.00"}`,
            },
            {
              headerName: "GM Dollars",
              valueGetter: (params) => {
                const salesUnits = params.data?.SalesUnits ?? 0;
                const price = params.data?.Price ?? 0;
                const cost = params.data?.Cost ?? 0;
                return salesUnits * price - salesUnits * cost;
              },
              valueFormatter: (params) =>
                `$ ${params.value?.toFixed(2) || "0.00"}`,
            },
            {
                headerName: "GM Percent",
                valueGetter: (params) => {
                  if (!params.data) return 0;
              
                  const salesUnits = params.data.SalesUnits ?? 0;
                  const price = params.data.Price ?? 0;
                  const cost = params.data.Cost ?? 0;
              
                  const salesDollars = salesUnits * price;
                  const gmDollars = salesDollars - salesUnits * cost;
                  const gmPercent =
                    salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
              
                  console.log(
                    `GM Percent for ${params.data.SKU}: ${gmPercent.toFixed(2)}%`
                  );
              
                  return gmPercent;
                },
                valueFormatter: (params) =>
                  `${params.value?.toFixed(2) || "0.00"}%`,
              
                cellClassRules: {
                  "green-cell": (params) => {
                    console.log(`✅ Green Check: ${params.value}`);
                    return Number(params.value ?? 0) >= 40;
                  },
                  "yellow-cell": (params) => {
                    console.log(`🟡 Yellow Check: ${params.value}`);
                    return Number(params.value ?? 0) >= 10 && Number(params.value ?? 0) < 40;
                  },
                  "orange-cell": (params) => {
                    console.log(`🟠 Orange Check: ${params.value}`);
                    return Number(params.value ?? 0) >= 5 && Number(params.value ?? 0) < 10;
                  },
                  "red-cell": (params) => {
                    console.log(`🔴 Red Check: ${params.value}`);
                    return Number(params.value ?? 0) < 5;
                  },
                },
              }
              
          ],
        },
      ],
    },
  ];

  console.log("Final Row Data in PlanningGrid:", rowData);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
  rowData={rowData}
  columnDefs={columnDefs}
  defaultColDef={{
    resizable: true,
    sortable: true,
    filter: true,
  }}
  getRowStyle={() => ({ animation: 'none' })} 
  pagination={true}
  paginationPageSize={10}
  suppressAnimationFrame={true} 
/>

    </div>
  );
};

export default PlanningGrid;
