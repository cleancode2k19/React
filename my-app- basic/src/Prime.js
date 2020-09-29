import React from 'react';

class Prime extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pcnt :25,
            pnum:0
        }
        this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({'pnum' : e.target.value});
        var event = new Event('input', { bubbles: true });
        this.myinput.dispatchEvent(event);
        
    }
    
    render() {
        
        const isPrime = num => {
            for(let i = 2; i < num; i++)
              if(num % i === 0) return false;
            return num > 1;
        }
        const PrimeTable = () => {
        let res = []
        for(let i = 1; i < 100; i++){
            if(isPrime(i)){
                res.push(i);
            }
        }
        var res1 = res.map(function(val){
        return <li class="flex-item">{val} </li>;
        })

        return  <ul class="flex-container">{ res1 }</ul>
            
        }
        const Green = () => {
            if(isPrime(this.state.pnum)){
                return  <div className="Green" >Number is prime</div>
            } else {
                return  <div className="Red" >Number is not prime</div>
            }
        }
        function* genPrime(n) {

            if (isNaN(n) || !isFinite(n) || n % 1 || n < 2)
                return " Number not valid : " + n;
            
                for (var i = 2; i < n; i++) {
                    if (isPrime(i)) {
                        yield i;
                    }
                }
            }
        const generatorObject = genPrime(600);
        let pnum100 = [];
        for (let i=0;i<100;i++){
            pnum100.push(generatorObject.next().value);
        }
        function listToMatrix(list, elementsPerSubArray) {
            var matrix = [], i, k;
        
            for (i = 0, k = -1; i < list.length; i++) {
                if (i % elementsPerSubArray === 0) {
                    k++;
                    matrix[k] = [];
                }
        
                matrix[k].push(list[i]);
            }
        
            return matrix;
        }
        var matrix = listToMatrix(pnum100, 5);

        return (
          <div ><br/>
                <label for="num">Prime Number Detector</label> &nbsp;&nbsp; &nbsp;
              <input type="number"  value={this.state.pnum} onChange={(e) => {this.handleChange(e)}} ref={(input)=> this.myinput = input} />
              <br/><br/>
              {this.state.pnum>0 ? <Green /> : ''}
              
                <br/>
           <h2>100 Prime Number Table</h2><br/>
           {matrix.map(item => (
               <ul class="flex-container">
               {item.map(itemi => (
                <li class="flex-item">{itemi}</li>
                ))}
                </ul>
            ))}
           
        <br/><br/>
           <h2>{this.state.pcnt} Prime Number from 1-100</h2><br/>
            
            <PrimeTable />
          </div>
        );
      }
      
}
export default Prime;