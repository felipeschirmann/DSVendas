import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
  labels: string[];
  series: number[];
};

const DonutChart = () => {
  const [chatData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
      const data = response.data as SaleSum[];
      const myLabels = data.map((x) => x.sellerName);
      const mySeries = data.map((x) => x.sum);

      setChartData({ labels: myLabels, series: mySeries });
    });
  }, []);

  const options = {
    legend: {
      show: true,
      labels: {
        colors: "#cbd5e1",
      },
    },
    chart: {
      background: "transparent",
      foreColor: "#cbd5e1",
    },
    colors: ["#FF8400", "#6366f1", "#14b8a6", "#ec4899", "#8b5cf6", "#3b82f6"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      colors: ["rgba(20, 24, 43, 0.65)"],
      width: 2,
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
      options={{ ...options, labels: chatData.labels }}
      series={chatData.series}
      type="donut"
      height={240}
    />
  );
};

export default DonutChart;
