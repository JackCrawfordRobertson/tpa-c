import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TestChart = ({ data, width = '100%', height = 400, title, showLogo = true, className = '' }) => {
  // The Payments Association green palette centered around #00dfb8
  const colours = {
    // Primary green palette
    primary: '#00dfb8',           // Main brand green
    primaryDark: '#00c4a3',       // Darker shade for contrast
    primaryLight: '#33e5c4',      // Lighter shade for gradients
    
    // Secondary greens
    secondary: '#00b894',         // Deeper emerald green
    secondaryLight: '#00d2a4',    // Medium emerald
    
    // Accent greens
    accent: '#00a085',            // Forest green
    accentLight: '#26d0ce',       // Teal green
    
    // Supporting greens
    tertiary: '#55efc4',          // Mint green
    quaternary: '#74b9ff',        // Blue-green for variety
    
    // Neutral palette (keeping shadcn foundation)
    background: 'hsl(0 0% 100%)',
    card: 'hsl(0 0% 100%)',
    border: 'hsl(154 25% 85%)',   // Green-tinted border
    muted: 'hsl(154 30% 96%)',    // Very light green background
    foreground: 'hsl(160 30% 15%)', // Dark green text
    mutedForeground: 'hsl(160 15% 45%)', // Medium green text
    
    // Chart specific
    gridLines: 'hsl(154 25% 88%)',
    tooltipBg: 'hsl(0 0% 100%)',
    shadow: 'rgba(0, 223, 184, 0.15)' // Green-tinted shadow
  };

  const PaymentsLogo = () => (
    <div className="payments-logo" style={{
      width: '120px',
      height: '40px',
      background: `linear-gradient(135deg, ${colours.primary}, ${colours.secondary})`,
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '-0.025em',
      boxShadow: `0 4px 6px ${colours.shadow}`
    }}>
      The Payments Association
    </div>
  );

  return (
    <div className={`payments-chart-container ${className}`}>
      <div className="chart-header">
        <div className="chart-header-content">
          <div className="chart-title-section">
            {title && <h3 className="chart-title">{title}</h3>}
            <p className="chart-subtitle">Payment transaction insights</p>
          </div>
          {showLogo && (
            <div className="chart-logo">
              <PaymentsLogo />
            </div>
          )}
        </div>
      </div>
      
      <div className="chart-content">
        <ResponsiveContainer width={width} height={height}>
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
          >
            <defs>
              {/* Primary green gradient for volume bars */}
              <linearGradient id="primaryGreenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colours.primaryLight} stopOpacity={0.95} />
                <stop offset="50%" stopColor={colours.primary} stopOpacity={0.9} />
                <stop offset="100%" stopColor={colours.primaryDark} stopOpacity={0.85} />
              </linearGradient>
              
              {/* Secondary green gradient for value bars */}
              <linearGradient id="secondaryGreenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colours.secondaryLight} stopOpacity={0.95} />
                <stop offset="50%" stopColor={colours.secondary} stopOpacity={0.9} />
                <stop offset="100%" stopColor={colours.accent} stopOpacity={0.85} />
              </linearGradient>

              {/* Subtle glow effect */}
              <filter id="greenGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={colours.gridLines}
              opacity={0.6}
              vertical={false}
            />
            
            <XAxis 
              dataKey="name" 
              tick={{ 
                fill: colours.mutedForeground, 
                fontSize: 12,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontWeight: 500
              }}
              axisLine={{ stroke: colours.border, strokeWidth: 1 }}
              tickLine={{ stroke: colours.border, strokeWidth: 1 }}
              tickMargin={8}
            />
            
            <YAxis 
              tick={{ 
                fill: colours.mutedForeground, 
                fontSize: 12,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
              }}
              axisLine={{ stroke: colours.border, strokeWidth: 1 }}
              tickLine={{ stroke: colours.border, strokeWidth: 1 }}
              tickMargin={8}
            />
            
            <Tooltip 
              contentStyle={{
                backgroundColor: colours.tooltipBg,
                border: `1px solid ${colours.primary}`,
                borderRadius: '8px',
                boxShadow: `0 10px 25px ${colours.shadow}`,
                fontSize: '13px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                color: colours.foreground,
                padding: '12px'
              }}
              cursor={{ 
                fill: colours.muted, 
                opacity: 0.4,
                stroke: colours.primary,
                strokeWidth: 1
              }}
              labelStyle={{ 
                color: colours.foreground, 
                fontWeight: 600, 
                marginBottom: '4px',
                borderBottom: `2px solid ${colours.primary}`,
                paddingBottom: '4px'
              }}
              itemStyle={{ 
                color: colours.mutedForeground,
                fontSize: '12px'
              }}
            />
            
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '13px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
              }}
              iconType="rect"
            />
            
            <Bar 
              dataKey="volume" 
              fill="url(#primaryGreenGradient)" 
              name="Transaction Volume"
              radius={[4, 4, 0, 0]}
              stroke={colours.primaryDark}
              strokeWidth={1}
              filter="url(#greenGlow)"
            />
            
            <Bar 
              dataKey="value" 
              fill="url(#secondaryGreenGradient)" 
              name="Transaction Value (£m)"
              radius={[4, 4, 0, 0]}
              stroke={colours.accent}
              strokeWidth={1}
              filter="url(#greenGlow)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-footer">
        <p className="data-source">Data source: The Payments Association Industry Research</p>
      </div>
    </div>
  );
};

export default TestChart;