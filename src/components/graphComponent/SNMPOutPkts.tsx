import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Point,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { enUS } from "date-fns/locale";

ChartJS.register(
  TimeScale,
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

interface SNMPOutPktsProps {
  hostId: string;
}

interface TimePoint extends Point {
  x: number;
  y: number;
}

const SNMPOutPkts: React.FC<SNMPOutPktsProps> = ({ hostId }) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);

  const getCurrentDateAtTime = (hours: number, minutes: number = 0) => {
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  };

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
        type: "time",
        adapters: {
          date: {
            locale: enUS,
          },
        },
        time: {
          unit: "hour",
          parser: "yyyy-MM-dd HH:mm:ss",
          displayFormats: {
            hour: "HH:mm",
          },
          tooltipFormat: "HH:mm:ss",
        },
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "Time",
        },
        min: getCurrentDateAtTime(0),
        max: getCurrentDateAtTime(22),
        ticks: {
          source: "auto",
          autoSkip: false,
          callback: function (value) {
            const date = new Date(value);
            const hours = date.getHours();
            return hours % 2 === 0
              ? `${hours.toString().padStart(2, "0")}:00`
              : "";
          },
          maxRotation: 0,
        },
      },
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

          if (outPktsItem && outPktsItem.data.length > 0) {
            const sortedData = outPktsItem.data.sort(
              (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
            );

            const labels = sortedData.map((entry) =>
              new Date(entry.timestamp).getTime()
            );
            const values = sortedData.map((entry) => Number(entry.value));

            setChartData({
              labels,
              datasets: [
                {
                  label: "Outcoming Packets",
                  data: values,
                  borderColor: "blue",
                  backgroundColor: "#87CEEB",
                  tension: 0.1,
                  borderWidth: 4,
                  pointRadius: 1,
                  pointHoverRadius: 4,
                  pointBackgroundColor: "white",
                  pointBorderColor: "blue",
                  pointBorderWidth: 2,
                  pointHoverBackgroundColor: "#87CEEB",
                  pointHoverBorderColor: "white",
                  fill: false,
                  showLine: true,
                },
              ],
            });
            setHasData(true);
            setError(null);
          } else {
            setError("No data available");
            setHasData(false);
          }
        } else {
          setError("Failed to fetch data");
          setHasData(false);
        }
      } catch (err) {
        setError("Error connecting to server");
        setHasData(false);
      }
    };

    if (hostId) {
      fetchData();
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, [hostId]);

  if (!hasData) {
    return (
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* <Paper elevation={3} sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
          <Typography color="error" sx={{ p: 2 }}>
            {error || "No data available"}
          </Typography>
        </Paper> */}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, height: "500px" }}>
        <Box sx={{ height: "100%", position: "relative" }}>
          <Line options={options} data={chartData} />
        </Box>
      </Paper>
    </Box>
  );
};

export default SNMPOutPkts;
