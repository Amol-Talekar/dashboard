import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: {
          type: String,
        },
        totalSales: {
          type: Number,
        },
        totalUnits: {
          type: Number,
        },
      },
    ],
    dailyData: [
      {
        date: {
          type: String,
        },
        totalSales: {
          type: Number,
        },
        totalUnits: {
          type: Number,
        },
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

export default OverallStat;
