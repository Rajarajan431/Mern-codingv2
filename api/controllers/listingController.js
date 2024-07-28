import Product from "../models/products.model.js";
import { getMonthNumberFromName } from '../utils/getMonth.js';

//GET AllProducts

export const getAllProducts = async (month, searchText) => {
  try {
    const monthNumber = month ? getMonthNumberFromName(month) : null;

    let searchQuery = {};
    if (searchText) {
      searchQuery = {
        $or: [
          { title: { $regex: searchText, $options: 'i' } },
          { description: { $regex: searchText, $options: 'i' } },
          { price: { $regex: searchText, $options: 'i' } },
        ],
      };
    }

    let monthQuery = {};
    if (monthNumber) {
      monthQuery = {
        $expr: {
          $and: [
            { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
          ],
        },
      };
    }

    const products = await Product.aggregate([
      { $match: { ...searchQuery, ...monthQuery } },
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

    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    const products = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
      },
      {
        $project: {
          price: 1,
          priceRange: {
            $switch: {
              branches: priceRanges.map(range => ({
                case: {
                  $and: [
                    { $gte: ["$price", range.min] },
                    { $lt: ["$price", range.max] }
                  ]
                },
                then: range.range
              })),
              default: "Other"
            }
          }
        }
      },
      {
        $group: {
          _id: "$priceRange",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          priceRange: "$_id",
          count: 1
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
    const searchText = req.params.searchText || '';
    
    const products = await getAllProducts(month, searchText);
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