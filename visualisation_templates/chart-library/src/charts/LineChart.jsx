import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PaymentsLineChart = ({ data, width = '100%', height = 400, title, className = '' }) => {
  const colours = {
    primary: 'hsl(210 100% 40%)',
    secondary: 'hsl(142 76% 36%)',
    accent: 'hsl(15 100% 60%)',
    muted: 'hsl(220 14% 96%)',
    border: 'hsl(220 13% 91%)',
    foreground: 'hsl(222 84% 5%)',
    mutedForeground: 'hsl(215 16% 47%)'
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && (
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
        </div>
      )}
      <div className="chart-content">
        <ResponsiveContainer width={width} height={height}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colours.border} opacity={0.5} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: colours.mutedForeground, fontSize: 12 }}
              axisLine={{ stroke: colours.border }}
            />
            <YAxis 
              tick={{ fill: colours.mutedForeground, fontSize: 12 }}
              axisLine={{ stroke: colours.border }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: `1px solid ${colours.border}`,
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke={colours.primary} 
              strokeWidth={2}
              dot={{ fill: colours.primary, strokeWidth: 2, r: 4 }}
              name="Transaction Volume"
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colours.secondary} 
              strokeWidth={2}
              dot={{ fill: colours.secondary, strokeWidth: 2, r: 4 }}
              name="Transaction Value (£m)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentsLineChart;