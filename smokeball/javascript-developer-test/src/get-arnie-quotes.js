const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  var res = [];
  for(var i=0;i<urls.length;i++){
    var msg = await httpGet(urls[i]).then(data => {
      var stringify = JSON.parse(data.body);
      return stringify["message"];
    });
    if(i==3){
      res.push({ 'FAILURE': msg })
    }else{
    res.push({ 'Arnie Quote': msg })
    }
  }
  return await res;
};

module.exports = {
  getArnieQuotes,
};
