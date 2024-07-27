import express from 'express'
import { getAllProducts, getBarChartData, getCombinedData, 
    getPieChartData, getStatistics } from '../controllers/listingController.js';

const router = express.Router();

router.get('/getAll/:month', getAllProducts);
router.get('/getStatistics/:month', getStatistics);
router.get('/getBarChart/:month', getBarChartData);
router.get('/getPieChart/:month', getPieChartData);
router.get('/getCombinedData/:month', getCombinedData);

export default router;