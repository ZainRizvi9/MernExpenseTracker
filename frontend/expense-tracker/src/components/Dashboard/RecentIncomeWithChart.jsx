import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";  // make sure this path matches your folder

const COLORS = ["875CF5", "FA2C37", "FF6900", "4f39f6"]

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  // Function to prepare the chart data
  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  // Update chart data whenever `data` changes
  useEffect(() => {
    prepareChartData();
    
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
