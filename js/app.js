//service worker reg

if(!window.Promise){
  window.Promise = Promise;
}

if("serviceWorker" in navigator){
  window.addEventListener('load', function() {
  navigator.serviceWorker
  .register('./sw.js')
  .then(() => console.log('worker registered'))
  .catch(err => console.log(err));
  });
}


//event for calculating the currencies
document.getElementById('convert').addEventListener('click', function(e){
  calculateRes();
  setTimeout(function(){
    document.getElementById('results').style.display = 'none';
  }, 20000);
  e.preventDefault();
});

//function to calculate the currency 
function calculateRes(res){

  let from = document.getElementById('from').value;
  const amount = document.getElementById('amount').value;
  let to = document.getElementById('to').value;
  const result = document.getElementById('result');


  const fromCurrency = from.toUpperCase();
  const toCurrency = to.toUpperCase();
  const query =  fromCurrency +'_'+ toCurrency;

  //api
  const url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+ query +'';

      const req = new Request(url, {mode: 'cors'});
      fetch(req)
       .then(function(response){
         return response.json();
       })
       .then(function(data){
          for(key in data.results){
            from = `<option value="${data.results[key].fr}">${ data.results[key].fr}</option>`;

            to = `<option value="${data.results[key].to}">${ data.results[key].to}</option>`;
            const val = parseFloat(data.results[key].val);

            if(val){
              let total = val * amount;
              result.value = Math.round(total * 100)/100;
            }
        }
        document.getElementById('results').style.display = 'block';
      });
  };

//iife for currency format
(function selectIndex(){
  let hint = document.getElementById('hint');

  const  url1 = 'https://free.currencyconverterapi.com/api/v5/currencies';

  const req1 = new Request(url1);
   fetch(req1)
   .then(function(res){
    return res.json();
     })
    .then(function(data1){
    let output = '';
    for(i in data1.results){
      output += `<option> ${i} </option>`;
       }
        hint.innerHTML = output;
  });
})();

