import Product from "../models/products.model.js";
import { getMonthNumberFromName } from '../utils/getMonth.js';

//GET AllProducts
export const getAllProducts = async (month) => {
  try {
    const monthNumber = getMonthNumberFromName(month);

    const products = await Product.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [{ $month: "$dateOfSale" }, monthNumber] },
              { $lte: [{ $month: "$dateOfSale" }, monthNumber] },
            ],
          },
        },
      },
    ]);

    return products;
  } catch (err) {
    console.error(err);
    throw new Error('Error retrieving products');
  }
};


//GET Statistics Data
export const getStatistics = async (month) => {
  try {
    const monthNumber = getMonthNumberFromName(month);

    const statistics = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: { if: { $eq: ["$sold", true] }, then: 1, else: 0 } } },
          totalNotSoldItems: { $sum: { $cond: { if: { $eq: ["$sold", false] }, then: 1, else: 0 } } }
        }
      }
    ]);

    return {
      totalSaleAmount: Math.round(statistics[0].totalSaleAmount),
      totalSoldItems: statistics[0].totalSoldItems,
      totalNotSoldItems: statistics[0].totalNotSoldItems
    };
  } catch (err) {
    console.error(err);
    throw new Error('Error retrieving statistics');
  }
};


//GET Bar Chart Data
export const getBarChartData = async (month) => {
  try {
    const monthNumber = getMonthNumberFromName(month);

    const products = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    return products;
  } catch (err) {
    console.error(err);
    throw new Error('Error retrieving bar chart data');
  }
};




  //GET PieChart Data
  export const getPieChartData = async (month) => {
    try {
      const monthNumber = getMonthNumberFromName(month);
  
      const products = await Product.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
          }
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);
  
      if (!products || products.length === 0) {
        throw new Error('No data found for the specified month');
      }
  
      return products;
    } catch (err) {
      console.error(err);
      throw new Error('Error retrieving pie chart data');
    }
  };
  

 //GET CombinedData
 export const getCombinedData = async (req, res) => {
  try {
    const month = req.params.month;

    const products = await getAllProducts(month);
    const statistics = await getStatistics(month);
    const barChartData = await getBarChartData(month);
    const pieChartData = await getPieChartData(month);

    const combinedData = { statistics, barChartData, pieChartData, products };
    res.json(combinedData);
  } catch (err) {
    console.error('Error fetching combined data:', err);
    res.status(500).json({ message: 'Error fetching combined data' });
  }
}