import express from 'express'
import { getAllListings } from '../controllers/listingController.js';

const router = express.Router();

router.get('/getAll', getAllListings);


export default router;