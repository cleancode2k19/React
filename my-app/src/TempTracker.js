import React from 'react';
/*
Write code to continually track the max, min, and avg as new numbers are inserted into a tracker class.
Write a class TempTracker with these methods: 
A method to insert a new temperature. 
A method to get the highest temperature we’ve seen so far
A method to get the lowest temperature we’ve seen so far 
A method to get the average of all temps we've seen so far 
Optimise for space and time. Favour speeding up the getters over the setters.
*/
class TempTracker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temps:[],
            temp:0,
            error:'',
            highest:0,
            lowest:0,
            showf:false
        }
        this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        let error ='';
        if (isNaN(event.target.value)) {
        error = 'only be number';
        }
      
        if (!event.target.value) {
        error = 'field cannot be empty';
        }
        this.setState({temp: event.target.value}); 
        this.setState({error: error});
        event = new Event('input', { bubbles: true });
        this.myinput.dispatchEvent(event);
        
    }
    handleSubmit(e){
        e.preventDefault();
        let temps= this.state.temps;
        temps.push(this.state.temp);
        this.setState({temps:temps});
        this.setState({showf:true});
        //find max array
        const highest = Math.max(...this.state.temps);
        this.setState({highest:highest});
        //Find Lowest temperature
        const lowest = Math.min(...this.state.temps);
        this.setState({lowest:lowest});
    }
    
    render() {
        return (
          <div>
              <br/>
              <form method="submit" onSubmit={this.handleSubmit}>
                <label htmlFor="temp">Enter the Temperature</label> &nbsp;&nbsp; &nbsp;
              <input type="number" name="temp"  value={this.state.temp} onChange={(e) => {this.handleChange(e)}} ref={(input)=> this.myinput = input} />
              <br/><br/>
              <button type="submit">Add Temperature</button>
              <br/>
              {this.state.error && <span>{this.state.error}</span> }
              <br/>
              </form>
              <ul className="flex-container">
                {this.state.showf && this.state.temps.length>0 && 
                this.state.temps.map(itemx => (
                <li className="flex-item">{itemx}</li>
                ))}
            </ul>
              <br/>
              {this.state.highest>0?
                <p><strong>Max Temperature - {this.state.highest}</strong></p>:''
            }   <br/>
            {this.state.lowest>0?
                <p><strong>Lowest Temperature - {this.state.lowest}</strong></p>:''
            } 
          </div>
        );
      }
      
}
export default TempTracker;