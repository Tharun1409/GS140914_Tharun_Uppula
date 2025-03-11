import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IStoreChartsData } from '../data/storeData';

interface ChartsPageProps {
    chartdatastore: IStoreChartsData[];
}

const ChartsPage: React.FC<ChartsPageProps> = ({ chartdatastore }) => {
    return (
        <div style={{ width: '100%', height: 500 }}>
            <h2>GM Dollars vs GM %</h2>
            
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartdatastore}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />

                    {/* GM Dollars as Bar */}
                    <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />

                    {/* GM % as Line */}
                    <LineChart>
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="gmPercent"
                            stroke="#82ca9d"
                            activeDot={{ r: 8 }}
                            name="GM %"
                        />
                    </LineChart>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartsPage;
