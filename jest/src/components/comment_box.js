import React, { Component } from 'react';
// to turn a component into a container to have access to the state:
import { connect } from 'react-redux';
// imports ALL action creators and stores them in variable actions
import * as actions from '../actions';

// not exporting our component any more, but exporting a container instead:
// export default class CommentBox extends Component {
class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            comment: '',
            name:'',
            email:'',
            phone:0,
            totalAmount:0,
            amountPaid:0,
            remainingAmount:0,
            error:'',
            items:[]
         };
        this.handleChange.bind(this);
        this.handleChangeName.bind(this);
        this.handleChangeEmail.bind(this);
        this.handleChangePhone.bind(this);
        this.handleChangeamountPaid.bind(this);
        this.handleChangetotalAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({ comment: event.target.value });
    }

    handleChangeName(event){
        this.setState({ name: event.target.value });
    }

    handleChangeEmail(event){
        this.setState({ email: event.target.value });
    }

    handleChangePhone(event){
        this.setState({ phone: event.target.value });
    }

    handleChangetotalAmount(event){
        this.setState({ totalAmount: event.target.value });
    }

    handleChangeamountPaid(event){
        //logic for amountpaid must be less than total amount
        if(this.state.totalAmount > event.target.value){
            this.setState({ error: ''});
            this.setState({ amountPaid: event.target.value });
            //logic for the offers
            if(this.state.totalAmount>99999){
                this.setState({ remainingAmount: this.state.totalAmount-this.state.amountPaid-2000 });
            } else if(this.state.totalAmount>74999){
                this.setState({ remainingAmount: this.state.totalAmount-this.state.amountPaid-1500 });
            } else if(this.state.totalAmount>49999){
                this.setState({ remainingAmount: this.state.totalAmount-this.state.amountPaid-1000 });
            } else if(this.state.totalAmount>9999){
                this.setState({ remainingAmount: this.state.totalAmount-this.state.amountPaid-200 });
            } else{
                this.setState({ remainingAmount: this.state.totalAmount-this.state.amountPaid });
            }
            
        } else{
            this.setState({ error: 'total value always greater or equal to amount paid' });
        }
    }

    handleSubmit(event){
        // keep the form from submitting to itself
        event.preventDefault();

        // new after having wired up the Container with the action creators
        this.props.saveComment(this.state);
        let items = [...this.state.items];

        items.push({
            comment: this.state.comment,
            name: this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            totalAmount:this.state.totalAmount,
            amountPaid:this.state.amountPaid,
            remainingAmount:this.state.remainingAmount
        });
        //console.log(this.state.items)
        this.setState({
        items:items
        });
        
    }

    render() {
        return (
            <div>
                {this.state &&this.state.error?
                   <p id="error">{this.state.error}</p>:''
                }
                
            <form onSubmit={this.handleSubmit} id="form" className="comment-box">
                <h4>Add a comment</h4>
                <label>Name:</label> &nbsp;&nbsp; &nbsp;
                <input name="name" id="name" type="text" value={this.state.name} onChange={(e) => {this.handleChangeName(e)}} required /> <br/><br/><br/>
                <label>Email:</label> &nbsp;&nbsp; &nbsp;
                <input name="email" id="email" type="email" value={this.state.email} onChange={(e) => {this.handleChangeEmail(e)}} required /> <br/><br/><br/>
                <label>Phone:</label> &nbsp;&nbsp; &nbsp;
                <input name="phone" id="phone" type="text" value={this.state.phone} onChange={(e) => {this.handleChangePhone(e)}} required /> <br/><br/><br/>
                <label>Total amount:</label> &nbsp;&nbsp; &nbsp;
                <input name="totalAmount" id="totalAmount" type="text" value={this.state.totalAmount} onChange={(e) => {this.handleChangetotalAmount(e)}} required /> <br/><br/><br/>
                <label> Amount Paid:</label> &nbsp;&nbsp; &nbsp;
                <input name="amountPaid" id="amountPaid" type="text" value={this.state.amountPaid} onChange={(e) => {this.handleChangeamountPaid(e,this.state.totalAmount)}} required /> <br/><br/><br/>
                <label>Remaining Amount:</label> &nbsp;&nbsp; &nbsp;
                <input name="remainingAmount" id="remainingAmount" type="text" value={this.state.totalAmount-this.state.amountPaid} required /> <br/><br/><br/>
                <label>Comment:</label> &nbsp;&nbsp; &nbsp;
                <textarea value={this.state.comment} onChange={(e) => {this.handleChange(e)}} required /><br/><br/><br/>
                <div>
                    <button action="submit">Submit Comment</button>
                </div>
            </form> <br/>

              <table>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Comment</th>
                    <th>Total amount</th>
                    <th>Paid Amount</th>
                    <th>Remaining Amount</th>
                </thead>
                <tbody>
                {this.state && this.state.items.length>0 && this.state.items.map(item => {
                    
                    return ( <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.comment}</td>
                        <td>{item.totalAmount}</td>
                        <td>{item.amountPaid}</td>
                        <td>{item.remainingAmount}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        )
    }
}

// to turn a component into a container, but we need no state at all ! So no mapStateToProps here !
// instead of mapDispatchToProps we insert actions here (shortcut)
// this will bind all action creators to our CommentBox under this.props (e.g. this.props.saveComment)
export default connect(null, actions)(CommentBox);