import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ScriptableContext,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
);

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart: any) {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    ctx.font = "bold 20px Poppins, Arial, sans-serif";
    ctx.fillStyle = "#1f2937";
    ctx.fillText("68", centerX, centerY - 10);

    ctx.font = "12px Poppins, Arial, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("Total Vehicles", centerX, centerY + 10);

    ctx.restore();
  },
};

const alignedShadowPlugin = {
  id: "alignedShadow",
  beforeDatasetsDraw(chart: any) {
    const { ctx, data } = chart;

    ctx.save();

    data.datasets.forEach((dataset: any, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      const shadowColor =
        datasetIndex === 0
          ? "rgba(252, 211, 77, 0.3)" // yellow for Completed
          : "rgba(239, 68, 68, 0.3)"; // Red for Cancelled

      meta.data.forEach((bar: any) => {
        const { x: barX, y: barY, width: barWidth, height: barHeight } = bar;

        if (barHeight > 0) {
          const shadowHeight = barHeight * 1.3; // 30% taller than actual bar
          const shadowY = barY - (shadowHeight - barHeight); // Align bottom with bar bottom

          const shadowGradient = ctx.createLinearGradient(
            barX - barWidth / 2,
            shadowY,
            barX - barWidth / 2,
            shadowY + shadowHeight
          );
          shadowGradient.addColorStop(0, shadowColor);
          shadowGradient.addColorStop(0.7, shadowColor);
          shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = shadowGradient;

          ctx.fillRect(barX - barWidth / 2, shadowY, barWidth, shadowHeight);
        }
      });
    });

    ctx.restore();
  },
};

export default function Dashboard() {
  const cardList = [
    {
      key: 1,
      title: "Total Drivers",
      count: 120,
      icon: <Groups2OutlinedIcon fontSize="medium" />,
      percentage: "+5.2%",
    },
    {
      key: 2,
      title: "Total Booking",
      count: 114,
      icon: <PlaylistAddCheckOutlinedIcon fontSize="medium" />,
      percentage: "+3.7%",
    },
    {
      key: 3,
      title: "Daily Revenue",
      count: 65230,
      icon: <AnalyticsOutlinedIcon fontSize="medium" />,
      percentage: "+8.5%",
      isRevenue: true,
    },
  ];

  const formatNumber = (num: number) => num.toLocaleString("en-PH");

  // Revenue data for full week - Line Chart
  const revenueData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Revenue (₱)",
        data: [38230, 45230, 52340, 61200, 58760, 65230, 58210],
        borderColor: "#10b981",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "rgba(16, 185, 129, 0.2)";
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)");
          gradient.addColorStop(0.7, "rgba(16, 185, 129, 0.2)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  // Vehicle Usage Status data - Donut Chart
  const vehicleData = [45, 15, 8];
  const totalVehicles = vehicleData.reduce((a, b) => a + b, 0);

  const vehicleUsageData = {
    labels: ["Active", "Inactive", "Maintenance"],
    datasets: [
      {
        data: vehicleData,
        backgroundColor: ["#356A29", "#BFBFBF", "#FFC300"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 8,
        cutout: "60%",
      },
    ],
  };

  // Booking Performance data - Bar Chart
  const bookingData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Completed",
        data: [18, 22, 25, 20, 28, 32, 24],
        backgroundColor: "#FCD34D",
        borderColor: "#10b981",
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: "Cancelled",
        data: [3, 2, 4, 5, 2, 1, 3],
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "start",
        position: "top",
        text: "Revenue Analytics",
        font: {
          family: "'Poppins', Arial, sans-serif",
          size: 14,
          weight: "bold",
        },
        color: "#000000",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `₱${(context.parsed.y ?? 0).toLocaleString("en-PH")}`;
          },
        },
        titleFont: {
          family: "'Poppins', Arial, sans-serif",
        },
        bodyFont: {
          family: "'Poppins', Arial, sans-serif",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 9,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₱)",
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 10,
          },
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (typeof value === "number" && value >= 1000) {
              return "₱" + (value / 1000).toFixed(0) + "k";
            }
            return "₱" + value;
          },
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 8,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
  };

  const donutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 8,
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 13,
          },
          padding: 8,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Vehicle Usage Status",
        align: "start",
        position: "top",
        font: {
          family: "'Poppins', Arial, sans-serif",
          size: 14,
          weight: "bold",
        },
        color: "#000000",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const percentage = Math.round((value / totalVehicles) * 100);
            return `${label}: ${value} vehicles (${percentage}%)`;
          },
        },
        titleFont: {
          family: "'Poppins', Arial, sans-serif",
        },
        bodyFont: {
          family: "'Poppins', Arial, sans-serif",
        },
      },
    },
    cutout: "60%",
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 13,
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Booking Performance",
        align: "start",
        position: "top",
        font: {
          family: "'Poppins', Arial, sans-serif",
          size: 14,
          weight: "bold",
        },
        color: "#000000",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value} bookings`;
          },
        },
        titleFont: {
          family: "'Poppins', Arial, sans-serif",
        },
        bodyFont: {
          family: "'Poppins', Arial, sans-serif",
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: "Days",
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 9,
          },
        },
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: "Number of Bookings",
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 10,
          },
        },
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Poppins', Arial, sans-serif",
            size: 8,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        suggestedMax: 40,
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
  };

  return (
    <div className="flex flex-col h-full w-full p-6 font-poppins bg-gray-50 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-x-5 xl:gap-x-7 gap-y-5 xl:gap-y-0 w-full mt-3">
        {cardList.map((card) => (
          <div
            key={card.key}
            className="flex flex-col w-full col-span-3 md:col-span-2 xl:col-span-1 px-3 py-5 rounded-2xl bg-white relative overflow-hidden shadow-lg"
          >
            <div className="flex justify-between items-center text-black">
              <p className="text-sm font-medium text-nowrap mb-5 text-[#4B5563]">
                {card.title}
              </p>
              <div className="p-2 m-0 rounded-lg bg-[#FFF5B4]">{card.icon}</div>
            </div>

            <div>
              <div className="flex items-baseline">
                {card.isRevenue ? (
                  <>
                    <span className="text-4xl text-black font-medium">₱</span>
                    <p className="text-4xl font-medium text-black ml-1">
                      {formatNumber(card.count)}
                    </p>
                  </>
                ) : (
                  <p className="text-4xl font-medium text-black">
                    {formatNumber(card.count)}
                  </p>
                )}
              </div>

              <div className="flex items-center mt-1 text-green-600">
                <TrendingUpOutlinedIcon fontSize="small" />
                <span className="text-xs font-normal ml-1">
                  {card.percentage} from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Container */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - Weekly Revenue */}
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-lg">
          <div className="h-64">
            <Line data={revenueData} options={lineOptions} />
          </div>
        </div>

        {/* Donut Chart - Vehicle Usage Status */}
        <div className="lg:col-span-1 bg-white p-3 rounded-2xl shadow-lg">
          <div className="h-64">
            <Doughnut
              data={vehicleUsageData}
              options={donutOptions}
              plugins={[centerTextPlugin]}
            />
          </div>
        </div>

        {/* Bar Chart - Booking Performance with Perfectly Aligned Shadows */}
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl shadow-lg">
          <div className="h-64">
            <Bar
              data={bookingData}
              options={barOptions}
              plugins={[alignedShadowPlugin]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
