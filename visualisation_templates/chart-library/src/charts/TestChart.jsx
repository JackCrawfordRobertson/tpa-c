import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TestChart = ({ data, width = '100%', height = 400, title, className = '' }) => {
  // Payments Association brand colours
  const colours = {
    primary: 'hsl(210 100% 40%)',      // #0066CC
    secondary: 'hsl(142 76% 36%)',     // #00AA44  
    accent: 'hsl(15 100% 60%)',        // #FF6B35
    muted: 'hsl(220 14% 96%)',         // #F8FAFC
    border: 'hsl(220 13% 91%)',        // #E2E8F0
    foreground: 'hsl(222 84% 5%)',     // #020817
    mutedForeground: 'hsl(215 16% 47%)' // #64748B
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
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={colours.border}
              opacity={0.5}
            />
            <XAxis 
              dataKey="name" 
              tick={{ 
                fill: colours.mutedForeground, 
                fontSize: 12,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
              }}
              axisLine={{ stroke: colours.border }}
              tickLine={{ stroke: colours.border }}
            />
            <YAxis 
              tick={{ 
                fill: colours.mutedForeground, 
                fontSize: 12,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
              }}
              axisLine={{ stroke: colours.border }}
              tickLine={{ stroke: colours.border }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: `1px solid ${colours.border}`,
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                fontSize: '12px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                color: colours.foreground
              }}
              cursor={{ fill: colours.muted }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '16px',
                fontSize: '12px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
              }}
            />
            <Bar 
              dataKey="volume" 
              fill={colours.primary} 
              name="Transaction Volume"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="value" 
              fill={colours.secondary} 
              name="Transaction Value (£m)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TestChart;