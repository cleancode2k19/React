import { useState, useEffect } from 'react'
import axios from "axios";
import { useLocation } from 'react-router-dom';

const BidList = () => {
    const [Bids, setBid] = useState([]);
    const { state } = useLocation();
    const [show, setShow] = useState(true);
    const [resData1, setResData1] = useState([]);
    
    const delay = 5;
    const titleOpt = {
        'pro1':'Project1',
        'pro2':'Project2',
        'pro3':'Project3'
    };
    useEffect(
        () => {
        getBids();
        timers();
    });
    const timers = () => {
        let timer1 = setTimeout(() => setShow(false), delay * 1000);
        return () => {
          clearTimeout(timer1);
        };
    }

    const getBids = async () => {
        const response = await axios.get('http://localhost:5000/bids');
        setBid(response.data);
        // for(let i=0; i<response.data.length; i++){
        //     response.data.amount
        // }
    }
 
    const deleteBid = async (id) => {
        await axios.delete(`http://localhost:5000/bids/${id}`);
        state.status = 'delSuccess';
        getBids();
    }
 
    return (
        <div>
            <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        { show && state.status==='addSuccess' && 'Bid added successfully' }
                        { show && state.status==='editSuccess' && 'Bid updated successfully' }
                        { show && state.status==='delSuccess' && 'Bid deleted successfully' }
						<h2>Bid <b>List</b></h2>
					</div>
					<div className="col-sm-6">
						<a href="/add" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Bid</span></a>
					</div>
                </div>
            </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Total Hours</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { Bids.length>0 && Bids.map((Bid, index) => (
                        <tr key={ Bid.id }>
                            <td>{ index + 1 }</td>
                            <td>{ Bid.name }</td>
                            <td>{ Bid.amount }</td>
                            <td>{ titleOpt[Bid.title] }</td>
                            <td>{ Bid.description }</td>
                            <td>{ Bid.totalHours }</td>
                            <td>{ Bid.endDate }</td>
                            <td>
                            <a href={`/edit/${Bid.id}`} className="edit" data-toggle="modal">
                                <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                            </a>
                            
                            <a href="javascript:void(0);" onClick={ () => deleteBid(Bid.id) }>
                                <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                            </a>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default BidList