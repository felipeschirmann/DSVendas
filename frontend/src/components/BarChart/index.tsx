import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
  name: string;
  data: number[];
};

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
};

const BarChart = () => {
  const [charData, setChartData] = useState<ChartData>({
    labels: {
      categories: [],
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
      const data = response.data as SaleSuccess[];
      const myLabels = data.map((x) => x.sellerName);
      const mySeries = data.map((x) => round((100.0 * x.deals) / x.visited, 1));

      setChartData({
        labels: { categories: myLabels },
        series: [
          {
            name: "% Sucesso",
            data: mySeries,
          },
        ],
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        distributed: true,
      },
    },
    chart: {
      background: "transparent",
      foreColor: "#cbd5e1",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF8400", "#6366f1", "#14b8a6", "#ec4899", "#8b5cf6", "#3b82f6"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.08)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      theme: "dark" as const,
    },
    theme: {
      mode: "dark" as const,
    },
  };
  return (
    // @ts-ignore
    <Chart
      options={{ ...options, xaxis: charData.labels }}
      series={charData.series}
      type="bar"
      height={240}
    />
  );
};

export default BarChart;
