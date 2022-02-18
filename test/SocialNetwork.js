const { assert } = require('chai');

const SocailNetwork = artifacts.require("SocailNetwork"); //reflect the socialnetwork in abs folder


require('chai').use(require('chai-as-promised')).should()

contract('SocialNetwork', (accounts) => { 

  let socialnetwork;

  before(async () => {
    socialnetwork = await SocailNetwork.deployed();
  });

  describe('deployment', async () => {
    let result;
    it("deploy successfully", async () => {
      const address = await socialnetwork.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it ("has a name", async () => {
      const name =await  socialnetwork.name();
      assert.equal(name, "My First NetWork");
    });

    it('create post', async () => {
      // console.log("deployer",deployer);
      // console.log("author",author);
      // console.log("tipper",tipper);
      result = await socialnetwork.createPost('Hello workd', { from: accounts[0] }); //from equlas msg.sender
      //author is the latest account;

      const post_count = await socialnetwork.PostCount();
      // console.log(post_count);
      assert.equal(post_count, 1);

      const event = result.logs[0].args;

      assert.equal(event.content, 'Hello workd');


       await socialnetwork.createPost('', { from: accounts[0] }).should.be.rejected; 

       

    });
  });


})