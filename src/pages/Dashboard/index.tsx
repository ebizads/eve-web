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
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const data = {
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        borderColor: "#4B5563",
        backgroundColor: "rgba(75, 85, 99, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Revenue Analytics",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₱)",
        },
      },
    },
  };

  return (
    <div className="flex flex-col h-full w-full p-6">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-x-5 xl:gap-x-7 gap-y-5 xl:gap-y-0 w-full mt-3">
        {cardList.map((card) => (
          <div
            key={card.key}
            className="flex flex-col w-full col-span-3 md:col-span-2 xl:col-span-1 px-3 py-5 rounded-2xl bg-white relative overflow-hidden shadow-2xl"
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

      {/* Line Chart */}
      <div className="mt-6 bg-white p-5 rounded-2xl shadow-2xl">
        <Line data={data} options={options} height={300} />
      </div>
    </div>
  );
}
