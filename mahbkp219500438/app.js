App = {
  web3Provider: null,
  contracts: {},
  init: function() {
    $(document).on('click', '.btn-claim', App.handleClaim);
  },
  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  handleClaim: function(event) {
    event.preventDefault();
    var claimInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      $('#message-form').html("<h3>Your message has been submitted successfully!</h3>").show()
      App.contracts.Claim.deployed().then(function(instance) {
        claimInstance = instance;

        // Execute adopt as a transaction by sending account
        return claimInstance.claim(lotId, {from: account});
      }).then(function() {
        $('#message-form').html("<h3>Your message has been submitted successfully!</h3>").show()
        return true;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
    }
  };

function SpinWheel() {
var stage = new createjs.Stage("canvas");
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.on("tick", tick);

var c = new createjs.Container(),
		s = new createjs.Shape();
    
var segments = 24,
	size = 250,
	angle = Math.PI*2/segments;
  
// Draw a wheel  
for (var i=0, l=segments; i<l; i++) {
	s.graphics.f((i%2==0)?"#bbb":"#ddd")
  	.mt(0,0)
  	.lt(Math.cos(angle*i)*size, Math.sin(angle*i)*size)
		.arc(0,0,size, i*angle, i*angle+angle)
    .lt(0,0);
    
  // Add text child
  var num = new createjs.Text(i,(size/8)+"px Arial Black", "#888")
		.set({textAlign:"center", regY:size-5, rotation:angle*180/Math.PI * (i+0.5)});
  c.addChild(num);
}

c.addChildAt(s, 0);
c.x = c.y = size + 20; 
c.cache(-size,-size,size*2,size*2);


c.rotation = -360/segments/2; // Rotate by 1/2 segment to align at 0

// Red Notch
var notch = new createjs.Shape();
notch.x = c.x;
notch.y = c.y-size;
notch.graphics.f("red").drawPolyStar(0,0,12,3,2,90);

// Where the wheel should land
var newNum = new createjs.Text("0", "50px Arial", "#000")
	.set({x:c.x, y: c.y+size+10, textAlign:"center"});


stage.addChild(c,notch,newNum);

// Mode. 0=stopped, 1=moving, 2=stopping
c.mode = 0;

// When clicked, cycle mode.
c.on("click", function(e) {
	if (c.mode == 0) {
  	c.mode = 1;
  } else if (c.mode == 1) {
  	c.mode = 2;
    
    // Slow down. Find the end angle, and tween to it
    var num = Math.random() * segments | 0, // Choose a number,
    	angleR = angle * 180/Math.PI, // Angle in degrees
     	adjusted = (c.rotation - 360),	// Add to the current rotation
      numRotations = Math.ceil(adjusted/360)*360 - num*angleR - angleR/2; // Find the final number.
    
    newNum.text = num; // Show the end number
    
    createjs.Tween.get(c)
    	.to({rotation:numRotations}, 3000, createjs.Ease.cubicOut)
      .call(function() { c.mode = 0; });
  }
});


function tick(event) {
	if (c.mode == 1) {
  	c.rotation -= 10; // Rotate if mode 1
  }
	stage.update(event);
}

};

$(function() {
  $(window).load(function() {
    SpinWheel();
    App.init(); 
  });
});
