import React from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles.css";

const TestChart = ({
  data,
  width = "100%",
  height = 400,
  title,
  showLogo = true,
  className = "",
}) => {
  // shadcn/ui inspired colour palette
  const colours = {
    primary: "#00dfb8",
    secondary: "#01583C",
    
    background: "#ffffff",
    card: "#fdfffe", // Very subtle teal tint added
    cardTint: "#f9fffe", // Even more subtle for sections
    border: "#e2e8f0",
    input: "#ffffff",
    
    foreground: "#0f172a",
    muted: "#f8fafc",
    mutedForeground: "#64748b",
    
    // Chart specific
    grid: "#f1f5f9",
    axis: "#cbd5e1",
  };

  const Logo = () => (
    <div className="flex items-center">
      <img
        src="https://res.cloudinary.com/dmlmugaye/image/upload/v1754492437/PA_Logo_Black_xlb4mj.svg"
        alt="The Payments Association"
        style={{
          height: "40px", // Fixed typo from "40x" to "40px"
          width: "auto",
        }}
      />
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: colours.background, // Keep tooltip pure white
            border: `1px solid ${colours.border}`,
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            fontSize: "14px",
            minWidth: "150px"
          }}
        >
          <p style={{ 
            margin: "0 0 8px 0",
            fontWeight: "500",
            color: colours.foreground
          }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} style={{ 
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px"
            }}>
              <div style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                borderRadius: "2px"
              }}></div>
              <span style={{ 
                fontSize: "13px",
                color: colours.mutedForeground
              }}>
                {entry.name}: 
                <span style={{ 
                  fontWeight: "500",
                  color: colours.foreground,
                  marginLeft: "4px"
                }}>
                  {entry.value.toLocaleString()}
                </span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`${className}`}
      style={{
        backgroundColor: colours.card, // Very subtle teal tint
        border: `1px solid ${colours.border}`,
        borderRadius: "12px",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Header - shadcn/ui style */}
      <div
        style={{
          padding: "24px 24px 0 24px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: colours.cardTint // Even more subtle tint for header
        }}
      >
        <div style={{ flex: 1 }}>
          {title && (
            <h3
              style={{
                margin: "0 0 2px 0",
                fontSize: "18px",
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
              fontSize: "14px",
              color: colours.mutedForeground,
              fontWeight: "400"
            }}
          >
            Payment transaction analysis
          </p>
        </div>

        {showLogo && (
          <div style={{ marginLeft: "16px" }}>
            <Logo />
          </div>
        )}
      </div>

      {/* Chart section */}
      <div style={{ 
        padding: "24px",
        backgroundColor: colours.cardTint // Subtle tint for chart area
      }}>
        <ResponsiveContainer width={width} height={height}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colours.grid}
              vertical={false}
              strokeWidth={1}
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: colours.mutedForeground,
                fontSize: 12,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}
              axisLine={{ stroke: colours.border, strokeWidth: 1 }}
              tickLine={false}
              tickMargin={8}
            />

            <YAxis
              tick={{
                fill: colours.mutedForeground,
                fontSize: 12,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "13px",
                color: colours.mutedForeground,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}
              iconType="rect"
            />

            <Bar
              dataKey="volume"
              fill={colours.primary}
              name="Transaction volume"
              radius={[4, 4, 0, 0]}
              strokeWidth={0}
            />

            <Bar
              dataKey="value"
              fill={colours.secondary}
              name="Transaction value (£m)"
              radius={[4, 4, 0, 0]}
              strokeWidth={0}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer - minimal shadcn/ui style */}
      <div
        style={{
          padding: "0 24px 20px 24px",
          borderTop: `1px solid ${colours.border}`,
          paddingTop: "16px",
          backgroundColor: colours.card // Subtle tint for footer
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "12px",
            color: colours.mutedForeground,
            fontWeight: "400"
          }}
        >
          Source: The payments association industry research
        </p>
      </div>
    </div>
  );
};

// Sample data - updated with better data
const samplePaymentsData = [
  { name: "Q1 2024", volume: 145000, value: 32060 },
  { name: "Q2 2024", volume: 162000, value: 42150 },
  { name: "Q3 2024", volume: 158000, value: 43320 },
  { name: "Q4 2024", volume: 171000, value: 46840 },
  { name: "Q1 2025", volume: 189000, value: 51200 },
  { name: "Q2 2025", volume: 203000, value: 56780 }
];

// Global chart library - keeping all functionality
window.PaymentsCharts = {
  render: function (containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
    }

    const root = createRoot(container);
    const data = options.data || samplePaymentsData;

    root.render(
      <TestChart
        data={data}
        width={options.width}
        height={options.height}
        title={options.title}
        showLogo={options.showLogo}
        className={options.className}
      />
    );
  },
};

// Auto-render - keeping all functionality
document.addEventListener("DOMContentLoaded", function () {
  const chartContainers = document.querySelectorAll("[data-payments-chart]");
  chartContainers.forEach((container) => {
    const chartData = container.getAttribute("data-chart-data");
    const chartTitle = container.getAttribute("data-chart-title");
    const showLogo = container.getAttribute("data-show-logo") !== "false";

    window.PaymentsCharts.render(container.id, {
      data: chartData ? JSON.parse(chartData) : undefined,
      title: chartTitle,
      showLogo: showLogo,
    });
  });
});

export default TestChart;