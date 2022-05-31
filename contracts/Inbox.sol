// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox {

    string public message = 'Hi';
    address private ownerAdress;

    constructor(string memory initialMessage) {
        ownerAdress = msg.sender;
        message = initialMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public onlyOwner(msg.sender) {
        require(msg.sender == ownerAdress, "Solo el owner puede modificar sus caracteristicas");
        message = newMessage;
    }

    modifier onlyOwner(address client) {
        require(ownerAdress == client, "Solo el owner puede modificar sus caracterisitcas");
        _;
    }
}
