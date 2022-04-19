import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 
const AddBid = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setPrice] = useState('');
    const navigate = useNavigate();
 
    const saveBid = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/bids',{
            title: title,
            amount: amount,
            name: name,
            description: description,
            totalHours: totalHours,
            endDate: endDate
        });
        navigate("/", { state: {
            status : 'addSuccess'
        } });
    }

    function handleSelectChange(event) {
        event && event.target && setTitle(event.target.value);
    }

    return (
        <div className="container">
            <div className="addbid">
            <form onSubmit={ saveBid }>
                <h3>Welcome Tradie, Bid your project here</h3>			
				<h4 className="modal-title">Add Bid</h4>
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
                    <select name="title"  className="form-control" value={title} onChange={handleSelectChange}> //set value here
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
                        placeholder="Total Hours"
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
                    <button className="btn btn-success">Save Bid</button>
                </div>
            </form>
            </div>
        </div>
    )
}
 
export default AddBid