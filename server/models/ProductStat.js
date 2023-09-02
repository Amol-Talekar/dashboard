import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  yearlySalesTotal: {
    type: Number,
  },
  yearlyTotalsoldUnits: {
    type: Number,
  },
  year: {
    type: Number,
  },
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
});

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);

export default ProductStat;
