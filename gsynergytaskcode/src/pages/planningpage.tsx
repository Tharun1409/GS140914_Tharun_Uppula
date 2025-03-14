import React, { useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "./planningpage.css";
// Register AG Grid's clint-side Row Model module
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IStoreData {
  Store: string;
  SKU: string;
  SalesUnits_W1: number;
  SalesUnits_W2: number;
  Price: number;
  Cost: number;
}

interface PlanningGridProps {
  rowData: IStoreData[];
}

const PlanningGrid: React.FC<PlanningGridProps> = ({ rowData }) => {
  const gridRef = useRef<AgGridReact>(null);

  const currencyFormatter = (params: any) =>
    params.value ? `$${Number(params.value).toFixed(2)}` : "$0.00";

  const percentageFormatter = (params: any) =>
    params.value !== undefined
      ? `${Number(params.value).toFixed(2)}%`
      : "0.00%";
// calculate sale dollars based on units sold and price
  const calculateSalesDollars = (units: number, price: number) => units * price;
  //calculate gross margin (GM) dollars
  const calculateGMDollars = (units: number, price: number, cost: number) =>
    units * (price - cost);
//calculate gross margin GM percentage
  const calculateGMPercent = (units: number, price: number, cost: number) => {
    const salesDollars = calculateSalesDollars(units, price);
    const gmDollars = calculateGMDollars(units, price, cost);
    return salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
  };
// Define column sturcture for AG Grid 
  const columnDefs: (ColDef<IStoreData> | ColGroupDef<IStoreData>)[] = useMemo(
    () => [
      { field: "Store", headerName: "Store", pinned: "left", width: 180 },
      { field: "SKU", headerName: "SKU", pinned: "left", width: 200 },

      {
        headerName: "Week 01",
        children: [
          { field: "SalesUnits_W1", headerName: "Sales Units", width: 120 },
          {
            headerName: "Sales Dollars",
            valueGetter: (params) =>
              calculateSalesDollars(
                params.data?.SalesUnits_W1 ?? 0,
                params.data?.Price ?? 0
              ),
            valueFormatter: currencyFormatter,
            width: 150,
          },
          {
            headerName: "GM Dollars",
            valueGetter: (params) =>
              calculateGMDollars(
                params.data?.SalesUnits_W1 ?? 0,
                params.data?.Price ?? 0,
                params.data?.Cost ?? 0
              ),
            valueFormatter: currencyFormatter,
            width: 150,
          },
          {
            headerName: "GM Percent",
            valueGetter: (params) =>
              calculateGMPercent(
                params.data?.SalesUnits_W1 ?? 0,
                params.data?.Price ?? 0,
                params.data?.Cost ?? 0
              ),
            valueFormatter: percentageFormatter,
            cellStyle: (params) => getGMCellStyle(params.value),
            width: 150,
          },
        ],
      },

      {
        headerName: "Week 02",
        children: [
          { field: "SalesUnits_W2", headerName: "Sales Units", width: 120 },
          {
            headerName: "Sales Dollars",
            valueGetter: (params) =>
              calculateSalesDollars(
                params.data?.SalesUnits_W2 ?? 0,
                params.data?.Price ?? 0
              ),
            valueFormatter: currencyFormatter,
            width: 150,
          },
          {
            headerName: "GM Dollars",
            valueGetter: (params) =>
              calculateGMDollars(
                params.data?.SalesUnits_W2 ?? 0,
                params.data?.Price ?? 0,
                params.data?.Cost ?? 0
              ),
            valueFormatter: currencyFormatter,
            width: 150,
          },
          {
            headerName: "GM Percent",
            valueGetter: (params) =>
              calculateGMPercent(
                params.data?.SalesUnits_W2 ?? 0,
                params.data?.Price ?? 0,
                params.data?.Cost ?? 0
              ),
            valueFormatter: percentageFormatter,
            cellStyle: (params) => getGMCellStyle(params.value),

            width: 150,
          },
        ],
      },
    ],
    [calculateGMPercent]
  );
// function to determine cell styling based on GM percent value 
//this not working correctly i have tried by done console.log but still not found ,
  const getGMCellStyle = (value?: number) => {
    
    if (typeof value !== "number") return {};
    if (value >= 50) return { backgroundColor: "#b2f7b2" };
    if (value >= 30) return { backgroundColor: "#fff1b2" };
    if (value >= 10) return { backgroundColor: "#ffc48c" };
    return { backgroundColor: "#ff9e9e" };
  };
  

  useEffect(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.refreshCells({
        columns: ["GM Percent"],
        force: true,
      });
    }
  }, [rowData]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData || []}
        columnDefs={columnDefs}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple"
      />
    </div>
  );
};

export default PlanningGrid;
