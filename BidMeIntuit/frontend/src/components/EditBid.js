import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditBid = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateBid = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/bids/${id}`,{
            title: title,
            amount: amount,
            name: name,
            description: description,
            totalHours: totalHours,
            endDate: endDate
        });
        navigate("/", { state: {
            status : 'editSuccess'
        } });
    }
 
    const getBidById = async () => {
        const response = await axios.get(`http://localhost:5000/bids/${id}`);
        if(response && response.data.length>0) {
            setTitle(response.data.title);
            setPrice(response.data.amount);
            setName(response.data.name);
            setDescription(response.data.description);
            setEndDate(response.data.endDate);
            setTotalHours(response.data.totalHours);

        }
    }

    useEffect(
        () => {
        getBidById();
    });

    function handleSelectChange(event) {
        event&& event.target && setTitle(event.target.value);
    }

    return (
        <div className="container">
            <div className="addbid">
            <form onSubmit={ updateBid }>					
				<h4 className="modal-title">Edit Bid</h4>
                <hr></hr>
                <div className="form-group">
                    <label >Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
 
                <div className="form-group">
                    <label>Price</label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Price"
                        value={ amount }
                        onChange={ (e) => setPrice(e.target.value) }
                    />
                </div>

                <div className="form-group">
                    <label >Project Title</label>
                    <select name="title"  className="form-control" value={title} onChange={handleSelectChange}>
                        <option value="pro1">Project1</option>
                        <option value="pro2">Project2</option>
                        <option value="pro3">Project3</option>
                    </select>
                </div>

                <div className="form-group">
                    <label >Description</label>
                    <textarea name="description" className="form-control" value={ description }
                        onChange={ (e) => setDescription(e.target.value) }>
                        { description }
                    </textarea>
                </div>


                <div className="form-group">
                    <label >Total Hours</label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="totalHours"
                        value={ totalHours }
                        onChange={ (e) => setTotalHours(e.target.value) }
                    />
                </div>

                <div className="form-group">
                    <label >End Date</label>
                    <input 
                        className="form-control"
                        type="datetime-local"
                        placeholder="End Date"
                        value={ endDate }
                        onChange={ (e) => setEndDate(e.target.value) }
                    />
                </div>
 
                <div className="form-group">
                    <button className="btn btn-success">Update</button>
                </div>
            </form>
        </div>
        </div>
    )
}
 
export default EditBid