import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Cards/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    console.log("📊 Raw expense data:", data); // <-- ADD THIS LINE

    // ✅ Filter only last 30 days of expenses
    const today = new Date();
    const filtered = data.filter((expense) => {
      const expenseDate = new Date(expense.date || expense.createdAt);
      const diffInDays = (today - expenseDate) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= 30;
    });

    console.log("✅ Filtered last 30 days:", filtered); // <-- ADD THIS TO
    // ✅ Prepare chart data
    const result = prepareExpenseBarChartData(filtered);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
