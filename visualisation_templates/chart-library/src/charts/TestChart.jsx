import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TestChart = ({ data, width = '100%', height = 400, title }) => {
  // payments association brand colours
  const colours = {
    primary: '#0066CC',
    secondary: '#00AA44',
    accent: '#FF6B35',
    neutral: '#6B7280'
  };

  return (
    <div className="payments-chart">
      {title && <h3 className="chart-title">{title}</h3>}
      <ResponsiveContainer width={width} height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#374151', fontSize: 12 }}
            axisLine={{ stroke: '#D1D5DB' }}
          />
          <YAxis 
            tick={{ fill: '#374151', fontSize: 12 }}
            axisLine={{ stroke: '#D1D5DB' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Bar dataKey="volume" fill={colours.primary} name="Transaction Volume" />
          <Bar dataKey="value" fill={colours.secondary} name="Transaction Value (£m)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TestChart;