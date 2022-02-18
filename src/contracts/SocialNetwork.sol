pragma solidity ^0.5.0;

contract SocailNetwork {
    string public name;
    uint104 public PostCount = 0;

    // mapping(uint256 => Post) posts; // key valued paired like associated array or declaring array

    // struct Post {
    //     // typhinting like typescript or like mongoose schema
    //     uint256 id;
    //     string content;
    //     uint256 tipAmount;
    //     address author; sender
    // }

    constructor() public {
        name = "My First NetWork";
    }

    // function createPost(string _content) public {
    //     PostCount++;

    //     _post = Post(PostCount, _content, 0, msg.sender); //msg.sender is like a global object that truffle support for finding the sender of the or address

    //     posts[PostCount] = _post;
    // }
}

// run truffle compile

// will create abs folder and new files which is the compilation
// of solidity code into json
