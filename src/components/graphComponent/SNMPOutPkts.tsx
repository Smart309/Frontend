import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataEntry {
  timestamp: string;
  value: string;
}

interface ItemId {
  _id: string;
  name_item: string;
  oid: string;
  type: string;
  unit: string;
}

interface Item {
  item_id: ItemId;
  data: DataEntry[];
}

interface Host {
  _id: {
    _id: string;
    hostname: string;
  };
  items: Item[];
}

interface ApiResponse {
  status: string;
  message: string;
  data: Host[];
}

interface SNMPInPktsProps {
  hostId: string;
}

const SNMPOutPkts: React.FC<SNMPInPktsProps> = ({ hostId }) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState<string | null>(null);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "SNMP Outcoming Packets Monitoring",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `Packets: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Packets",
        },
      },
      x: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!hostId) return;

      try {
        const response = await fetch(`http://127.0.0.1:3000/data/${hostId}`);
        const result: ApiResponse = await response.json();

        if (result.status === "success") {
          const host = result.data[0];
          const outPktsItem = host.items.find(
            (item) => item.item_id.name_item === "snmpOutPkts"
          );

          if (outPktsItem) {
            // Sort data by timestamp
            const sortedData = [...outPktsItem.data].sort(
              (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );

            // Format timestamps for display
            const labels = sortedData.map(entry => {
              const date = new Date(entry.timestamp);
              return date.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              });
            });

            // Get the values
            const values = sortedData.map(entry => Number(entry.value));

            setChartData({
              labels,
              datasets: [
                {
                  label: "Outcoming Packets",
                  data: values,
                  borderColor: "rgb(25, 118, 210)", // MUI primary blue
                  backgroundColor: "rgba(25, 118, 210, 0.5)",
                  tension: 0.1,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  pointBackgroundColor: "white",
                  pointBorderColor: "rgb(25, 118, 210)",
                  pointBorderWidth: 2,
                  pointHoverBackgroundColor: "rgb(25, 118, 210)",
                  pointHoverBorderColor: "white",
                  fill: false,
                },
              ],
            });
          }
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error connecting to server");
      }
    };

    if (hostId) {
      fetchData();
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, [hostId]);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          height: "500px",
          backgroundColor: "background.paper" 
        }}
      >
        {error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ height: "100%", position: "relative" }}>
            <Line options={options} data={chartData} />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SNMPOutPkts;