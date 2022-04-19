pragma solidity ^0.5.0;

contract Claim {
  address[16] public claimer;

  // Claiming a value
  function claim(uint lotId) public returns (uint) {
    claimer[lotId] = msg.sender;
    return lotId;
  }
  
  // Retrieving the claims
  function getClaimer() public view returns (address[16] memory) {
     return claimer;
  }
  
}


