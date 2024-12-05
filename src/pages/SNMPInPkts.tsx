import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
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

// Register ChartJS components
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

const SNMPInpktsGraphs = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState<string | null>(null);

  // Define fixed time labels from 00:00 to 22:00
  const timeLabels = [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ];

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "SNMP Incoming Packets Monitoring",
        font: {
          size: 16,
          weight: "bold",
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
          maxRotation: 0,
          autoSkip: false,
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/data");
        const result: ApiResponse = await response.json();

        if (result.status === "success") {
          const host = result.data[0];
          const inPktsItem = host.items.find(
            (item) => item.item_id._id === "snmpInPkts"
          );

          if (inPktsItem) {
            // Initialize data array with zeros for all time slots
            const dataValues = new Array(timeLabels.length).fill(0);

            // Process the actual data
            inPktsItem.data.forEach((entry) => {
              const entryTime = new Date(entry.timestamp).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              );

              // Find the appropriate time slot
              const timeSlot = timeLabels.findIndex((label, index) => {
                const currentHour = parseInt(entryTime.split(":")[0]);
                const nextLabel = timeLabels[index + 1];
                const currentLabelHour = parseInt(label.split(":")[0]);
                const nextLabelHour = nextLabel
                  ? parseInt(nextLabel.split(":")[0])
                  : 24;

                return (
                  currentHour >= currentLabelHour && currentHour < nextLabelHour
                );
              });

              if (timeSlot !== -1) {
                dataValues[timeSlot] = Number(entry.value);
              }
            });

            setChartData({
              labels: timeLabels,
              datasets: [
                {
                  label: "Incoming Packets",
                  data: dataValues,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgba(75, 192, 192, 0.5)",
                  tension: 0.1,
                  pointRadius: 0,
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

    fetchData();
    const interval = setInterval(fetchData, 1000000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "primary.main" }}
        >
          SNMP Monitoring
        </Typography>
        <Paper elevation={3} sx={{ p: 3, height: "500px" }}>
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
    </Container>
  );
};

export default SNMPInpktsGraphs;
