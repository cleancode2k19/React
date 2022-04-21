import Bid from "../models/bidModel.js";
import Sequelize from 'sequelize';
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
        if(req.params.id === 'min'){
            const Bids = await Bid.findAll({
                attributes: [Sequelize.fn('min', Sequelize.col('amount'))],
                group: ["title"],
                raw: true,
            });
            res.json(Bids);
        } 
        // else {
        //     const Bid = Bid.findAll({
        //         where: {
        //             id: req.params.id
        //         }
        //     }).then((result) =>{
                
        //     }).catch();
        //     console.log(Bid);
        //     res.json(Bid);
        // }
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