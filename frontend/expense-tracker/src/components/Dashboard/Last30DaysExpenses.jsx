import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Cards/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    console.log("📊 Raw expense data:", data);

    const today = new Date();
    const filtered = data.filter((expense) => {
      let expenseDate;

      // ✅ Handle both real Date objects and formatted strings
      try {
        if (expense.date) {
          // Try to parse ISO or fallback formatted string
          expenseDate = new Date(expense.date);
          if (isNaN(expenseDate)) {
            // If it's like "23rd Oct 2025", manually parse it
            const cleaned = expense.date
              .replace(/(\d+)(st|nd|rd|th)/, "$1") // remove 'th', 'st', etc.
              .replace(/(\w{3,})/, "$1");
            expenseDate = new Date(cleaned);
          }
        } else if (expense.createdAt) {
          expenseDate = new Date(expense.createdAt);
        } else {
          return false;
        }
      } catch {
        return false;
      }

      const diffInDays = (today - expenseDate) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= 30;
    });

    console.log("✅ Filtered last 30 days:", filtered);

    const result = prepareExpenseBarChartData(filtered);
    console.log("📈 Chart data:", result);
    setChartData(result);
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
