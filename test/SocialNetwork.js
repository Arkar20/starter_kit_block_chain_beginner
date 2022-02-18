const { assert } = require('chai');
import { toWei, toBN } from 'web3-utils';
// import Eth from "web3-Eth";
// var Eth = require('web3-eth');
// import {Utils} from 'web3-utils';
// import {Eth} from 'web3-eth';
// import {Eth} from 'web3-eth';

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

    
  });

  describe('Posts', async () => {
    let result,post_count;

    before(async () => {
      result = await socialnetwork.createPost('Hello workd', { from: accounts[0] }); //from equlas msg.sender
      //author is the latest account;

       post_count = await socialnetwork.PostCount();
    });

    it('create post', async () => {
      // console.log("deployer",deployer);
      // console.log("author",author);
      // console.log("tipper",tipper);
      // result = await socialnetwork.createPost('Hello workd', { from: accounts[0] }); //from equlas msg.sender
      // //author is the latest account;

      // const post_count = await socialnetwork.PostCount();
      // console.log(post_count);
      assert.equal(post_count, 1);

      const event = result.logs[0].args;

      assert.equal(event.content, 'Hello workd');


       await socialnetwork.createPost('', { from: accounts[0] }).should.be.rejected; 

      
    });

    it('retrieve posts', async () => {
      const post = await socialnetwork.posts(post_count);

      assert.equal(post.content, 'Hello workd');

    });
    it("tip a post", async () => {

      // from accounts[2] will send to accounts[0] 1 eth
      
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(accounts[0]);
      oldAuthorBalance = new toBN(oldAuthorBalance);

      console.log(oldAuthorBalance);
      result = await socialnetwork.tipCreate(post_count,{ from: accounts[2], value: toWei('1', "Ether") });
      // console.log(result)
      const event = result.logs[0].args;
      // console.log(event);

      assert.equal(event.content, 'Hello workd');
      assert.equal(event.tipAmount, '1000000000000000000');
      

      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(accounts[0]);
      newAuthorBalance = new toBN(newAuthorBalance);

      let tipAmount;
      tipAmount =  toWei('1', 'Ether');
      tipAmount = new toBN(tipAmount);

      let expectedBalance = oldAuthorBalance.add(tipAmount);

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());
    })
  })


})