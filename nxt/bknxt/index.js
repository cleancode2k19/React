const express= require("express");
var cors = require('cors')
const http = require('http');
const app = express();
const axios =require('axios');
app.use(cors())

app.get('/get/:search',(req,res, next) =>{
    //service call to third party url

    var query = req.params.search;
    var result=[];
    var reGet = axios.get('https://content.guardianapis.com/search?q='+query+'&api-key=test').then(
          result => {
            
            result= result.data.response.results
            console.log(result)
            res.send(result);
          },
          error => {
            console.log(error);
            res.send(error);
          }
          );
    console.log(result)
   

});
app.listen(5000,()=>{
    console.log('on port 5000')
});

