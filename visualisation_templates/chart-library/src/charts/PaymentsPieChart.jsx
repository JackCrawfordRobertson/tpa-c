import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles.css";

const PaymentsPieChart = ({
  data,
  width = "100%",
  height = 400,
  title,
  showLogo = true,
  className = "",
  sourceText = "The payments association industry research",
  sourceUrl = null,
  notesDescription = null,
  showInnerRadius = false,
  showLabels = true,
  showLegend = true,
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowNotesModal(false);
      }
    };

    if (showNotesModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showNotesModal]);

  // Enhanced device breakpoints
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Dynamic sizing based on screen size
  const getResponsiveSizes = () => {
    if (isSmallMobile) {
      return {
        containerPadding: "12px",
        headerPadding: "12px 12px 0 12px",
        footerPadding: "0 12px 12px 12px",
        titleFontSize: "14px",
        subtitleFontSize: "11px",
        logoHeight: "24px",
        chartHeight: Math.min(windowHeight * 0.5, 350),
        chartMargin: { top: 15, right: 50, bottom: 15, left: 50 },
        outerRadiusMultiplier: 0.18,
        labelFontSize: "8px",
        labelValueFontSize: "7px",
      };
    }
    
    if (isMobile) {
      return {
        containerPadding: "16px",
        headerPadding: "16px 16px 0 16px",
        footerPadding: "0 16px 16px 16px",
        titleFontSize: "16px",
        subtitleFontSize: "12px",
        logoHeight: "28px",
        chartHeight: Math.min(windowHeight * 0.6, 400),
        chartMargin: { top: 20, right: 60, bottom: 20, left: 60 },
        outerRadiusMultiplier: 0.22,
        labelFontSize: "9px",
        labelValueFontSize: "8px",
      };
    }
    
    if (isTablet) {
      return {
        containerPadding: "20px",
        headerPadding: "20px 20px 0 20px",
        footerPadding: "0 20px 16px 20px",
        titleFontSize: "17px",
        subtitleFontSize: "13px",
        logoHeight: "36px",
        chartHeight: height,
        chartMargin: { top: 20, right: 70, bottom: 20, left: 70 },
        outerRadiusMultiplier: 0.28,
        labelFontSize: "11px",
        labelValueFontSize: "10px",
      };
    }
    
    return {
      containerPadding: "24px",
      headerPadding: "24px 24px 0 24px",
      footerPadding: "0 24px 20px 24px",
      titleFontSize: "18px",
      subtitleFontSize: "14px",
      logoHeight: "40px",
      chartHeight: height,
      chartMargin: { top: 20, right: 80, bottom: 20, left: 80 },
      outerRadiusMultiplier: 0.32,
      labelFontSize: "12px",
      labelValueFontSize: "11px",
    };
  };

  const sizes = getResponsiveSizes();

  // Colour palette - only greens
  const colours = {
    primary: "#00dfb8",
    secondary: "#00573B",
    tertiary: "#00C29D",
    quaternary: "#007152",
    quinary: "#00A783",
    
    background: "#ffffff",
    card: "#fdfffe",
    cardTint: "#f9fffe",
    border: "#e2e8f0",
    input: "#ffffff",
    
    foreground: "#0f172a",
    muted: "#f8fafc",
    mutedForeground: "#64748b",
    
    grid: "#f1f5f9",
    axis: "#cbd5e1",
  };

  // Pie chart colour palette - only green variations
  const pieColours = [
    colours.primary,      // #00dfb8 - bright teal
    colours.secondary,    // #00573B - dark green
    colours.tertiary,     // #00C29D - medium teal
    colours.quaternary,   // #007152 - forest green
    colours.quinary,      // #00A783 - sea green
    "#10d9c4",           // slightly lighter teal
    "#004d3d",           // darker forest green
    "#00b894",           // mint green
    "#006b5a",           // deep green
    "#00f5d4",           // very light teal
    "#003d32",           // very dark green
    "#009688",           // material teal
  ];

  // Info icon SVG
  const InfoIcon = ({ size = 16, color = colours.mutedForeground }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: 'pointer' }}
    >
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="m12 8h.01"/>
    </svg>
  );

  // Close icon SVG
  const CloseIcon = ({ size = 24, color = colours.mutedForeground }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: 'pointer' }}
    >
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </svg>
  );

  // Notes Modal Component
  const NotesModal = () => {
    if (!showNotesModal || !notesDescription) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: sizes.containerPadding,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowNotesModal(false);
          }
        }}
      >
        <div
          style={{
            backgroundColor: colours.background,
            borderRadius: '12px',
            border: `1px solid ${colours.border}`,
            maxWidth: isMobile ? '100%' : '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div
            style={{
              padding: sizes.containerPadding,
              borderBottom: `1px solid ${colours.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: sizes.titleFontSize,
                fontWeight: '600',
                color: colours.foreground,
              }}
            >
              Chart Notes
            </h3>
            <button
              onClick={() => setShowNotesModal(false)}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colours.muted;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div style={{ padding: sizes.containerPadding }}>
            <p
              style={{
                margin: 0,
                fontSize: sizes.subtitleFontSize,
                lineHeight: '1.6',
                color: colours.foreground,
                whiteSpace: 'pre-wrap',
              }}
            >
              {notesDescription}
            </p>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: `${parseInt(sizes.containerPadding) * 0.75}px ${sizes.containerPadding} ${sizes.containerPadding}`,
              borderTop: `1px solid ${colours.border}`,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={() => setShowNotesModal(false)}
              style={{
                padding: '8px 16px',
                fontSize: sizes.subtitleFontSize,
                backgroundColor: colours.primary,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontWeight: '500',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colours.secondary;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colours.primary;
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Prepare pie data - convert the first data key to pie format
  const getPieData = () => {
    if (!data || data.length === 0) return [];
    
    // Get the first numeric key for pie data
    const sampleData = data[0];
    const numericKeys = Object.keys(sampleData).filter(key => 
      key !== 'name' && typeof sampleData[key] === 'number'
    );
    
    if (numericKeys.length === 0) return [];
    
    const dataKey = numericKeys[0]; // Use first numeric key
    
    return data.map((item, index) => ({
      name: item.name,
      value: item[dataKey],
      color: pieColours[index % pieColours.length],
    }));
  };

  // Enhanced custom label with connecting lines (outside segments)
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name, index }) => {
    if (!showLabels) return null;
    
    // Only show label if percentage is above threshold
    const threshold = isSmallMobile ? 0.05 : isMobile ? 0.03 : 0.02;
    if (percent < threshold) return null;

    const RADIAN = Math.PI / 180;
    const labelDistance = isSmallMobile ? 25 : isMobile ? 30 : 35;
    const radius = outerRadius + labelDistance;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Calculate line points
    const lineStart = {
      x: cx + outerRadius * Math.cos(-midAngle * RADIAN),
      y: cy + outerRadius * Math.sin(-midAngle * RADIAN)
    };
    
    const lineMiddle = {
      x: cx + (outerRadius + (labelDistance * 0.5)) * Math.cos(-midAngle * RADIAN),
      y: cy + (outerRadius + (labelDistance * 0.5)) * Math.sin(-midAngle * RADIAN)
    };

    const formatValue = (val) => {
      if (isSmallMobile) {
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
        return val.toString();
      }
      if (isMobile) {
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
        return val.toString();
      }
      return val.toLocaleString();
    };

    const textAnchor = x > cx ? 'start' : 'end';
    const labelX = textAnchor === 'start' ? x + 3 : x - 3;

    // Dynamic label width based on content length
    const maxNameLength = isSmallMobile ? 6 : isMobile ? 8 : 12;
    const displayName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...` : name;
    const labelWidth = isSmallMobile ? 45 : isMobile ? 60 : 80;
    const labelHeight = isSmallMobile ? 18 : isMobile ? 20 : 24;

    return (
      <g key={`label-${index}`}>
        {/* Connecting line */}
        <polyline
          points={`${lineStart.x},${lineStart.y} ${lineMiddle.x},${lineMiddle.y} ${x},${y}`}
          stroke={colours.mutedForeground}
          strokeWidth={0.5}
          fill="none"
          opacity={0.7}
        />
        
        {/* Transparent label background */}
        <rect
          x={textAnchor === 'start' ? labelX - 2 : labelX - labelWidth + 2}
          y={y - (labelHeight * 0.8)}
          width={labelWidth}
          height={labelHeight}
          fill="transparent"
          rx={2}
        />
        
        {/* Category name with text shadow for better readability */}
        <text
          x={labelX}
          y={y - (isSmallMobile ? 6 : isMobile ? 6 : 4)}
          textAnchor={textAnchor}
          fill={colours.foreground}
          fontSize={sizes.labelFontSize}
          fontWeight="600"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          style={{
            textShadow: '1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)'
          }}
        >
          {displayName}
        </text>
        
        {/* Value and percentage with text shadow */}
        <text
          x={labelX}
          y={y + (isSmallMobile ? 2 : isMobile ? 4 : 6)}
          textAnchor={textAnchor}
          fill={colours.mutedForeground}
          fontSize={sizes.labelValueFontSize}
          fontWeight="400"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          style={{
            textShadow: '1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)'
          }}
        >
          {formatValue(value)} ({(percent * 100).toFixed(isSmallMobile ? 0 : 1)}%)
        </text>
      </g>
    );
  };

  // Enhanced custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div
          style={{
            backgroundColor: colours.background,
            border: `1px solid ${colours.border}`,
            borderRadius: "8px",
            padding: sizes.containerPadding,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            fontSize: sizes.subtitleFontSize,
            minWidth: isSmallMobile ? "100px" : isMobile ? "120px" : "150px",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          <p style={{ 
            margin: "0 0 6px 0",
            fontWeight: "500",
            color: colours.foreground
          }}>
            {data.name}
          </p>
          <div style={{ 
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              backgroundColor: data.color,
              borderRadius: "2px",
              flexShrink: 0
            }}></div>
            <span style={{ 
              fontSize: `${parseInt(sizes.subtitleFontSize) - 1}px`,
              color: colours.mutedForeground,
              display: "flex",
              alignItems: "center"
            }}>
              Value: 
              <span style={{ 
                fontWeight: "500",
                color: colours.foreground,
                marginLeft: "4px"
              }}>
                {data.value.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Logo component
  const Logo = () => (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img
        src="https://res.cloudinary.com/dmlmugaye/image/upload/v1754492437/PA_Logo_Black_xlb4mj.svg"
        alt="The Payments Association"
        style={{
          height: sizes.logoHeight,
          width: "auto",
          maxWidth: "100%"
        }}
      />
    </div>
  );

  // Footer content component
  const FooterContent = () => {
    const textStyle = {
      margin: "0",
      fontSize: `${parseInt(sizes.subtitleFontSize) - 2}px`,
      color: colours.mutedForeground,
      fontWeight: "400"
    };

    const SourceText = () => {
      if (sourceUrl) {
        return (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...textStyle,
              textDecoration: "underline",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.color = colours.primary;
            }}
            onMouseOut={(e) => {
              e.target.style.color = colours.mutedForeground;
            }}
          >
            Source: {sourceText}
          </a>
        );
      }

      return (
        <span style={textStyle}>
          Source: {sourceText}
        </span>
      );
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '4px' : '16px',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2px' : '16px',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}>
          <SourceText />
          <span style={{
            ...textStyle,
            color: colours.mutedForeground,
          }}>
            Chart: Payments Intelligence
          </span>
        </div>
        
        {/* Notes Icon */}
        {notesDescription && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease',
            }}
            onClick={() => setShowNotesModal(true)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colours.muted;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="View chart notes"
          >
            <InfoIcon size={isSmallMobile ? 12 : isMobile ? 14 : 16} />
            <span style={{
              ...textStyle,
              fontSize: `${parseInt(textStyle.fontSize) - 1}px`,
              color: colours.mutedForeground,
            }}>
              Notes
            </span>
          </div>
        )}
      </div>
    );
  };

  const pieData = getPieData();
  const chartSize = Math.min(windowWidth * 0.8, sizes.chartHeight);
  const innerRadius = showInnerRadius ? chartSize * 0.15 : 0;
  const outerRadius = chartSize * sizes.outerRadiusMultiplier;

  return (
    <>
      <div
        style={{
          backgroundColor: colours.card,
          border: `1px solid ${colours.border}`,
          borderRadius: isMobile ? "8px" : "12px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          overflow: "hidden",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          margin: "0 auto"
        }}
        className={className}
      >
        {/* Header */}
        <div
          style={{
            padding: sizes.headerPadding,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: colours.cardTint,
            boxSizing: "border-box"
          }}
        >
          <div style={{ 
            flex: 1,
            minWidth: 0
          }}>
            {title && (
              <h3
                style={{
                  margin: "0 0 2px 0",
                  fontSize: sizes.titleFontSize,
                  fontWeight: "600",
                  color: colours.foreground,
                  lineHeight: "1.25",
                  letterSpacing: "-0.025em"
                }}
              >
                {title}
              </h3>
            )}
            <p
              style={{
                margin: "0",
                fontSize: sizes.subtitleFontSize,
                color: colours.mutedForeground,
                fontWeight: "400"
              }}
            >
              {isMobile ? "Payment distribution" : "Payment transaction distribution"}
            </p>
          </div>

          {showLogo && (
            <div style={{ 
              marginLeft: isMobile ? "8px" : "16px",
              flexShrink: 0
            }}>
              <Logo />
            </div>
          )}
        </div>

        {/* Chart section */}
        <div style={{ 
          padding: sizes.containerPadding,
          backgroundColor: colours.cardTint,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: sizes.chartHeight + (isMobile ? 30 : 40),
        }}>
          <ResponsiveContainer width="100%" height={sizes.chartHeight + (isMobile ? 30 : 40)}>
            <RechartsPieChart margin={sizes.chartMargin}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={1}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={hoveredIndex === index ? colours.foreground : 'none'}
                    strokeWidth={hoveredIndex === index ? 2 : 0}
                    style={{
                      filter: hoveredIndex === index ? 'brightness(1.1)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {showLegend && !showLabels && (
                <Legend
                  wrapperStyle={{
                    paddingTop: "16px",
                    fontSize: sizes.labelFontSize,
                    color: colours.mutedForeground,
                    fontFamily: "ui-sans-serif, system-ui, sans-serif"
                  }}
                  iconType="rect"
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              )}
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: sizes.footerPadding,
            borderTop: `1px solid ${colours.border}`,
            paddingTop: parseInt(sizes.containerPadding) * 0.75,
            backgroundColor: colours.card,
            boxSizing: "border-box"
          }}
        >
          <FooterContent />
        </div>
      </div>

      {/* Notes Modal */}
      <NotesModal />
    </>
  );
};

// Sample data for pie chart
const samplePaymentsPieData = [
  { name: "Card payments", volume: 145000 },
  { name: "Bank transfers", volume: 89000 },
  { name: "Digital wallets", volume: 67000 },
  { name: "Direct debit", volume: 34000 },
  { name: "Cash", volume: 12000 },
  { name: "Cheques", volume: 3000 }
];

// Global chart library
window.PaymentsCharts = {
  render: function (containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
    }

    const root = createRoot(container);
    const data = options.data || samplePaymentsPieData;

    root.render(
      <PaymentsPieChart
        data={data}
        width={options.width}
        height={options.height}
        title={options.title}
        showLogo={options.showLogo}
        className={options.className}
        sourceText={options.sourceText}
        sourceUrl={options.sourceUrl}
        notesDescription={options.notesDescription}
        showInnerRadius={options.showInnerRadius}
        showLabels={options.showLabels}
        showLegend={options.showLegend}
      />
    );
  },
};

// Auto-render functionality
document.addEventListener("DOMContentLoaded", function () {
  const chartContainers = document.querySelectorAll("[data-payments-pie-chart]");
  chartContainers.forEach((container) => {
    const chartData = container.getAttribute("data-chart-data");
    const chartTitle = container.getAttribute("data-chart-title");
    const showLogo = container.getAttribute("data-show-logo") !== "false";
    const sourceText = container.getAttribute("data-source-text");
    const sourceUrl = container.getAttribute("data-source-url");
    const notesDescription = container.getAttribute("data-notes-description");
    const showInnerRadius = container.getAttribute("data-show-inner-radius") === "true";
    const showLabels = container.getAttribute("data-show-labels") !== "false";
    const showLegend = container.getAttribute("data-show-legend") !== "false";

    window.PaymentsCharts.render(container.id, {
      data: chartData ? JSON.parse(chartData) : undefined,
      title: chartTitle,
      showLogo: showLogo,
      sourceText: sourceText,
      sourceUrl: sourceUrl,
      notesDescription: notesDescription,
      showInnerRadius: showInnerRadius,
      showLabels: showLabels,
      showLegend: showLegend,
    });
  });
});

export default PaymentsPieChart;