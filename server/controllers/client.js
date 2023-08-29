import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProdcuts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await Product.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const allTransactions = await Transaction.find();

    let filteredTransactions;
    if (search.length > 0) {
      filteredTransactions = await Transaction.find({
        products: { $elemMatch: { $eq: search } },
      });
    }

    // console.log("allTransactions  ==> ", allTransactions.length);

    let total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    // console.log("transactions.length =========> ", transactions.length);
    //console.log("total ============> ", total);

    let updatedTotal =
      search.length > 0 ? filteredTransactions : allTransactions.length;
    res.status(200).json({
      transactions,
      total: updatedTotal,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countyISO3 = getCountryIso3(country);
      //console.log("countyISO3 ==>> ", countyISO3);
      if (!acc[countyISO3]) {
        acc[countyISO3] = 0;
      }
      acc[countyISO3]++;

      return acc;
    }, {});

    ///console.log("mappedLocations   ==> ", mappedLocations);

    const formattedLocation = Object.entries(mappedLocations).map(
      ([id, value]) => {
        return { id, value };
      }
    );

    console.log("formattedlocation  ==> ", formattedLocation);

    res.status(200).json(formattedLocation);
  } catch (err) {
    console.log("err from the getGeography controller ===> ", err);
    res.status(404).json({ message: err.message });
  }
};
