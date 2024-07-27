import axios from "axios";
import Product from "../models/products.model.js";


//GET AllProducts
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error);
    }
}


//GET Statistics Data
export const getStatistics = async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
  
    try {
      const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const endDate = new Date(startDate.getTime() + 31 * 24 * 60 * 60 * 1000);
  
      const products = await Product.find({
        dateOfSale: { $gte: startDate, $lt: endDate }
      });
  
      const soldProducts = products.filter(product => product.sold);
      const notSoldProducts = products.filter(product => !product.sold);
  
      const totalSaleAmount = Math.round(soldProducts.reduce((acc, product) => acc + product.price, 0));
      const totalSoldItems = soldProducts.length;
      const totalNotSoldItems = notSoldProducts.length;
  
      res.json({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving statistics' });
    }
  };



  //GET BarChart Data
  export const getBarChartData = async (req, res) => {
    const month = req.params.month;
  
    try {
      const products = await Product.find({
        $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
      });
  
      const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity }
      ];
  
      const data = priceRanges.map((range) => {
        const count = products.filter((product) => product.price >= range.min && product.price <= range.max).length;
        return { label: `${range.min} - ${range.max}`, count };
      });
  
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving bar chart data' });
    }
  };


  //GET PieChart Data
  export const getPieChartData = async (req, res) => {
    const month = parseInt(req.params.month, 10); // Ensure month is an integer
  
    try {
      const products = await Product.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
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
        return res.status(404).json({ message: 'No data found for the specified month' });
      }
  
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving pie chart data' });
    }
  };


  //GET CombinedData
  export const getCombinedData = async(req, res) => {
    try {
      const month = req.params.month;
      const statisticsResponse = await fetch(`/api/statistics/${month}`);
      const barChartDataResponse = await fetch(`/api/barChartData/${month}`);
      const pieChartDataResponse = await fetch(`/api/pieChartData/${month}`);
  
      const statistics = await statisticsResponse.json();
      const barChartData = await barChartDataResponse.json();
      const pieChartData = await pieChartDataResponse.json();
  
      const combinedData = { statistics, barChartData, pieChartData };
      res.json(combinedData);
    } catch (err) {
      console.error('Error fetching combined data:', err);
      res.status(500).json({ message: 'Error fetching combined data' });
    }  
   
  }