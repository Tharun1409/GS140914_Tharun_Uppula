import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IStoreData } from '../types/storeTypes';
import { ColDef, ValueGetterParams, ValueFormatterParams, CellClassParams } from 'ag-grid-community';

interface PlanningGridProps {
    rowData: IStoreData[];
}

const PlanningGrid: React.FC<PlanningGridProps> = ({ rowData }) => {
    const columnDefs: ColDef<IStoreData>[] = [
        { field: 'Store', headerName: 'Store' },
        { field: 'SKU', headerName: 'SKU' },
        { field: 'Week', headerName: 'Week' },
        {
            field: 'SalesUnits',
            headerName: 'Sales Units',
            editable: true
        },
        {
            headerName: 'Sales Dollars',
            valueGetter: (params: ValueGetterParams<IStoreData>) => {
                const salesUnits = params.data?.SalesUnits ?? 0;
                const price = params.data?.Price ?? 0;
                return salesUnits * price;
            },
            valueFormatter: (params: ValueFormatterParams<IStoreData>) =>
                `$ ${params.value?.toFixed(2) || '0.00'}`
        },
        {
            headerName: 'GM Dollars',
            valueGetter: (params: ValueGetterParams<IStoreData>) => {
                const salesUnits = params.data?.SalesUnits ?? 0;
                const price = params.data?.Price ?? 0;
                const cost = params.data?.Cost ?? 0;
                return (salesUnits * price) - (salesUnits * cost);
            },
            valueFormatter: (params: ValueFormatterParams<IStoreData>) =>
                `$ ${params.value?.toFixed(2) || '0.00'}`
        },
        {
            headerName: 'GM Percent',
            valueGetter: (params: ValueGetterParams<IStoreData>) => {
                const salesUnits = params.data?.SalesUnits ?? 0;
                const price = params.data?.Price ?? 0;
                const cost = params.data?.Cost ?? 0;

                const salesDollars = salesUnits * price;
                const gmDollars = salesDollars - (salesUnits * cost);

                return salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
            },
            valueFormatter: (params: ValueFormatterParams<IStoreData>) =>
                `${params.value?.toFixed(2) || '0.00'}%`,

            cellStyle: (params: CellClassParams<IStoreData>) => {
                if (params.value >= 40) {
                    return { backgroundColor: '#4CAF50', color: '#fff' }; // Green
                } else if (params.value >= 10) {
                    return { backgroundColor: '#FFD700', color: '#000' }; // Yellow
                } else if (params.value >= 5) {
                    return { backgroundColor: '#FFA500', color: '#fff' }; // Orange
                } else {
                    return { backgroundColor: '#FF5733', color: '#fff' }; // Red
                }
            }
        }
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ resizable: true, sortable: true, filter: true }}
            />
        </div>
    );
};

export default PlanningGrid;
