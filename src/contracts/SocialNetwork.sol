pragma solidity ^0.5.0;

contract SocailNetwork {
    string public name;
    uint104 public PostCount = 0;

    mapping(uint256 => Post) public posts; // key valued paired like associated array or declaring array

    struct Post {
        // typhinting like typescript or like mongoose schema
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author; //sender
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );
    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    constructor() public {
        name = "My First NetWork";
    }

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0); //validation rules

        PostCount++;

        posts[PostCount] = Post(PostCount, _content, 0, msg.sender); //msg.sender is like a global object that truffle support for finding the sender of the or address

        //trigger events - to track the value inside the struct

        emit PostCreated(PostCount, _content, 0, msg.sender);
    }

    function tipCreate(uint256 _id) public payable {
        //payable to allow the function to pay actually
        //fetch the post
        Post memory _post = posts[_id];
        //fetch the author
        address payable _author = _post.author;
        //paid the author
        address(_author).transfer(msg.value);

        //increment the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;

        //update the post
        posts[_id] = _post;
        //trigger the event
        emit PostTipped(_id, _post.content, _post.tipAmount, _author);
    }
}

// run truffle compile

// will create abs folder and new files which is the compilation
// of solidity code into json
