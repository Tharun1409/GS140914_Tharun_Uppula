import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IStoreData } from "../data/storeData";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "./planningpage.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PlanningGridProps {
  rowData: IStoreData[];
}

const PlanningGrid: React.FC<PlanningGridProps> = ({ rowData }) => {
  const currencyFormatter = (params: any) =>
    params.value ? `$${params.value.toFixed(2)}` : "$0.00";

  const percentageFormatter = (params: any) =>
    params.value ? `${params.value.toFixed(2)}%` : "0.00%";

  const calculateSalesDollars = (params: any) =>
    params.data ? params.data.SalesUnits * params.data.Price : 0;

  const calculateGMDollars = (params: any) =>
    params.data ? params.data.SalesUnits * (params.data.Price - params.data.Cost) : 0;

  const calculateGMPercent = (params: any) => {
    if (!params.data) return 0;
    const salesDollars = params.data.SalesUnits * params.data.Price;
    const gmDollars = salesDollars - params.data.SalesUnits * params.data.Cost;
    return salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
  };

  const getGMCellStyle = (params: any) => {
    if (params.value >= 40) return { backgroundColor: "green", color: "white" };
    if (params.value >= 10) return { backgroundColor: "yellow", color: "black" };
    if (params.value >= 5) return { backgroundColor: "orange", color: "black" };
    return { backgroundColor: "red", color: "white" };
  };

  const columnDefs: (ColDef<IStoreData> | ColGroupDef<IStoreData>)[] = useMemo(
    () => [
      { field: "Store", headerName: "Store", pinned: "left", width: 200 },
      { field: "SKU", headerName: "SKU", pinned: "left", width: 200 },
      {
        headerName: "January",
        children: [
          {
            headerName: "Week 01",
            children: [
              { field: "SalesUnitsWeek1", headerName: "Sales Units", editable: true },
              {
                headerName: "Sales Dollars",
                valueGetter: calculateSalesDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Dollars",
                valueGetter: calculateGMDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Percent",
                valueGetter: calculateGMPercent,
                valueFormatter: percentageFormatter,
                cellStyle: getGMCellStyle,
              },
            ],
          },
          {
            headerName: "Week 02",
            children: [
              { field: "SalesUnitsWeek2", headerName: "Sales Units", editable: true },
              {
                headerName: "Sales Dollars",
                valueGetter: calculateSalesDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Dollars",
                valueGetter: calculateGMDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Percent",
                valueGetter: calculateGMPercent,
                valueFormatter: percentageFormatter,
                cellStyle: getGMCellStyle,
              },
            ],
          },
        ],
      },
      {
        headerName: "February",
        children: [
          {
            headerName: "Week 03",
            children: [
              { field: "SalesUnitsWeek3", headerName: "Sales Units", editable: true },
              {
                headerName: "Sales Dollars",
                valueGetter: calculateSalesDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Dollars",
                valueGetter: calculateGMDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Percent",
                valueGetter: calculateGMPercent,
                valueFormatter: percentageFormatter,
                cellStyle: getGMCellStyle,
              },
            ],
          },
          {
            headerName: "Week 04",
            children: [
              { field: "SalesUnitsWeek4", headerName: "Sales Units", editable: true },
              {
                headerName: "Sales Dollars",
                valueGetter: calculateSalesDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Dollars",
                valueGetter: calculateGMDollars,
                valueFormatter: currencyFormatter,
              },
              {
                headerName: "GM Percent",
                valueGetter: calculateGMPercent,
                valueFormatter: percentageFormatter,
                cellStyle: getGMCellStyle,
              },
            ],
          },
        ],
      },
    ],
    []
  );

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
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default PlanningGrid;
