import express from 'express'
import { getAllProducts, getBarChartData, getCombinedData, 
    getPieChartData, getStatistics } from '../controllers/listingController.js';

const router = express.Router();

router.get('/getAll', getAllProducts);
router.get('/getStatistics/:year/:month', getStatistics);
router.get('/getBarChart/:month', getBarChartData);
router.get('/getPieChart/:month', getPieChartData);
router.get('/combinedData/:month', getCombinedData);

export default router;