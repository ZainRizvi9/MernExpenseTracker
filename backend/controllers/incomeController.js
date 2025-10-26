
const xlsx = require("xlsx")
const Income = require("../models/Income")

// add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, source, amount, date } = req.body;

        //validation check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({ message: "All fields are required" })
        }

        const newIncome = new Income ({
            userId, 
            icon,
            source,
            amount, 
            date: new Date(date)
        }); 

        await newIncome.save(); 
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "server error"})
    }
}

// get all income source
// get all income source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const incomes = await Income.find({ userId }).sort({ date: -1 });
      res.status(200).json(incomes);
    } catch (error) {
      console.error("Error fetching income:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

//delete income source
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "income deleted successfully "})
    } catch (error){
        res.status(500).json({ message: "Server Error"})
    }
}

//download excel 
// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


