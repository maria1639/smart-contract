// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.9.0;

contract Poster {

uint public count = 0; // state variable

struct Contract {
    uint id;
    address user;
    string content;
	string tag;
  }

mapping(uint => Contract) public posts;

event NewPost(address indexed user, string content, string indexed tag);

function post(string memory content, string memory tag) public {
emit NewPost(msg.sender, content, tag);
count++;
posts[count] = Contract(count, msg.sender, content, tag);
}

}
