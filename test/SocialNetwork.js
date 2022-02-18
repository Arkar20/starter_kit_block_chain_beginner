const { assert } = require('chai');

const SocailNetwork = artifacts.require("SocailNetwork"); //reflect the socialnetwork in abs folder


require('chai').use(require('chai-as-promised')).should()

contract('SocialNetwork', (accounts) => { 

  let socialnetwork;

  describe('deployment', async () => {
    it("deploy successfully", async () => {
      socialnetwork = await SocailNetwork.deployed();
      const address = await socialnetwork.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);

    });
  });


})