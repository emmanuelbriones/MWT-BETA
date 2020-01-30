// Twitter Bootstrap JS - bootstrap.min.js

// 0. Create a button group dynamically with a loop

// 1. Create a single button in 'btn-group' class. Use this markup. 
// <button class="btn">Button</button>
// HINT: Use html()
// REF: https://api.jquery.com/html/

//$('.btn-group').html('<button class="btn">Click</button>');

// 2. Create a variable limit loop 3 times
var limit = 4;

// 3. Create a for loop that loops 3 times. Cut & paste code from number 1 above to make 3 buttons. Replace html() with append(). 
// HINT: Use append()
// REF: https://api.jquery.com/append/

for (var i=0; i < limit; i++) {
  
  $('.btn-group').append('<button class="btn">Click</button>');
  
  // check index is counting correctly
  console.log(i);
  
}