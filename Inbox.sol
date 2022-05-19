pragma solidity ^ 0.8.0;

contract Inbox {
    string public message;

    constructor(string initialMessage) {
        message = initialMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}