import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IStoreData, storeDatas } from '../data/storeData';
import { ColDef, ValueGetterParams, ValueFormatterParams, CellClassParams, ColGroupDef } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import './planningpage.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PlanningGridProps {
    rowData: IStoreData[];
}

const PlanningGrid: React.FC<PlanningGridProps> = ({ rowData }) => {
    const columnDefs: (ColDef<IStoreData> | ColGroupDef<IStoreData>)[] = [
        { field: 'Store', headerName: 'Store' },
        { field: 'SKU', headerName: 'SKU' },
    
      
        {
            headerName: 'Calendar',
            children: [
                {
                    headerName: 'January',
                    children: [
                        { field: 'Week', headerName: 'Week' },
                        {
                            field: 'SalesUnits',
                            headerName: 'Sales Units',
                            editable: true
                        },
                        {
                            headerName: 'Sales Dollars',
                            valueGetter: (params) => {
                                const salesUnits = params.data?.SalesUnits ?? 0;
                                const price = params.data?.Price ?? 0;
                                return salesUnits * price;
                            },
                            valueFormatter: (params) =>
                                `$ ${params.value?.toFixed(2) || '0.00'}`
                        },
                        {
                            headerName: 'GM Dollars',
                            valueGetter: (params) => {
                                const salesUnits = params.data?.SalesUnits ?? 0;
                                const price = params.data?.Price ?? 0;
                                const cost = params.data?.Cost ?? 0;
                                return (salesUnits * price) - (salesUnits * cost);
                            },
                            valueFormatter: (params) =>
                                `$ ${params.value?.toFixed(2) || '0.00'}`
                        },
                        {
                            headerName: 'GM Percent',
                            valueGetter: (params) => {
                                const salesUnits = params.data?.SalesUnits ?? 0;
                                const price = params.data?.Price ?? 0;
                                const cost = params.data?.Cost ?? 0;
    
                                const salesDollars = salesUnits * price;
                                const gmDollars = salesDollars - (salesUnits * cost);
    
                                return salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
                            },
                            valueFormatter: (params) =>
                                `${params.value?.toFixed(2) || '0.00'}%`,
                            cellStyle: (params) => {
                                if (params.value >= 40) {
                                    return { backgroundColor: '#4CAF50', color: '#fff' }; 
                                } else if (params.value >= 10) {
                                    return { backgroundColor: '#FFD700', color: '#000' }; 
                                } else if (params.value >= 5) {
                                    return { backgroundColor: '#FFA500', color: '#fff' }; 
                                } else {
                                    return { backgroundColor: '#FF5733', color: '#fff' }; 
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ];
    

    console.log("Final Row Data in PlanningGrid:", rowData);

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ resizable: true, sortable: true, filter: true }}
                rowModelType="clientSide"
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default PlanningGrid;
