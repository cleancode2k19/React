import Bid from "../models/bidModel.js";
 
export const getAllBids = async (req, res) => {
    try {
        const Bids = await Bid.findAll();
        res.json(Bids);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getBidById = async (req, res) => {
    try {
        console.log(req.params.id);
        const Bid = await Bid.findAll({
            where: {
                id: req.params.id
            }
        });
        console.log('update00000000');
        console.log(Bid);
        res.json(Bid[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createBid = async (req, res) => {
    try {
        await Bid.create(req.body);
        res.json({
            "message": "Bid Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateBid = async (req, res) => {
    try {
        await Bid.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Bid Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteBid = async (req, res) => {
    try {
        await Bid.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Bid Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}