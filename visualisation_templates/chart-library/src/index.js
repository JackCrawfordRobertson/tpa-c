import React from 'react';
import { createRoot } from 'react-dom/client';
import TestChart from './charts/TestChart';
import PaymentsLineChart from './charts/LineChart';
import './styles.css';

// Sample data
const samplePaymentsData = [
  { name: 'Jan', volume: 45000, value: 1200 },
  { name: 'Feb', volume: 52000, value: 1450 },
  { name: 'Mar', volume: 48000, value: 1320 },
  { name: 'Apr', volume: 61000, value: 1680 },
  { name: 'May', volume: 58000, value: 1590 },
  { name: 'Jun', volume: 67000, value: 1820 }
];

// Global chart library
window.PaymentsCharts = {
  render: function(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
    }

    const root = createRoot(container);
    const data = options.data || samplePaymentsData;
    const chartType = options.type || 'payments-bar';

    switch(chartType) {
      case 'payments-bar':
        root.render(
          <TestChart 
            data={data} 
            width={options.width} 
            height={options.height}
            title={options.title}
            className={options.className}
          />
        );
        break;
      case 'payments-line':
        root.render(
          <PaymentsLineChart 
            data={data} 
            width={options.width} 
            height={options.height}
            title={options.title}
            className={options.className}
          />
        );
        break;
      default:
        console.error(`Chart type ${chartType} not recognised`);
    }
  }
};

// Auto-render
document.addEventListener('DOMContentLoaded', function() {
  const chartContainers = document.querySelectorAll('[data-payments-chart]');
  chartContainers.forEach(container => {
    const chartType = container.getAttribute('data-payments-chart');
    const chartData = container.getAttribute('data-chart-data');
    const chartTitle = container.getAttribute('data-chart-title');
    
    window.PaymentsCharts.render(container.id, {
      type: chartType,
      data: chartData ? JSON.parse(chartData) : undefined,
      title: chartTitle
    });
  });
});