import express from "express";
 
import { 
    getAllBids,
    createBid,
    getBidById,
    updateBid,
    deleteBid
} from "../controllers/Bids.js";
 
const router = express.Router();
 
router.get('/', getAllBids);
router.get('/:id', getBidById);
router.post('/', createBid);
router.patch('/:id', updateBid);
router.delete('/:id', deleteBid);
 
export default router;